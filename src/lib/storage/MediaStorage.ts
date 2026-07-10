export interface MediaStorage {
  /**
   * Uploads a file and returns its unique URL or ID
   */
  upload(file: File): Promise<string>;

  /**
   * Retrieves a file's public URL by its ID
   */
  get(id: string): Promise<string | null>;

  /**
   * Deletes a file by its ID
   */
  delete(id: string): Promise<void>;
}
