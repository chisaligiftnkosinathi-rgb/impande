export interface DomainEvent<T = any> {
  id: string;
  type: string;
  occurredAt: string;
  actorId: string;
  resourceId: string;
  payload: T;
}

type EventHandler = (event: DomainEvent) => void | Promise<void>;

export class EventBus {
  private static handlers: Map<string, EventHandler[]> = new Map();

  static subscribe(eventType: string, handler: EventHandler) {
    const currentHandlers = this.handlers.get(eventType) || [];
    currentHandlers.push(handler);
    this.handlers.set(eventType, currentHandlers);
  }

  static async publish<T>(
    type: string,
    actorId: string,
    resourceId: string,
    payload: T
  ): Promise<void> {
    const event: DomainEvent<T> = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      occurredAt: new Date().toISOString(),
      actorId,
      resourceId,
      payload
    };

    // In a production system, this would write to an audit log table 
    // or a distributed message broker (Kafka, SQS, etc.)
    console.log(`[EVENT BUS] Published ${type} for resource ${resourceId} by actor ${actorId}`);

    const handlers = this.handlers.get(type) || [];
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (err) {
        console.error(`[EVENT BUS] Error handling ${type}:`, err);
      }
    }
  }
}
