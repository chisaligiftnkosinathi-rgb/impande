import { MediaStorage } from './MediaStorage';
import fs from 'fs/promises';
import path from 'path';

export class LocalAdapter implements MediaStorage {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const filePath = path.join(this.uploadDir, uniqueFilename);
    
    await fs.writeFile(filePath, buffer);
    return `/uploads/${uniqueFilename}`; // Public URL
  }

  async get(id: string): Promise<string | null> {
    const filePath = path.join(this.uploadDir, id.replace('/uploads/', ''));
    try {
      await fs.access(filePath);
      return id; // It's already a valid public URL path
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<void> {
    const filePath = path.join(this.uploadDir, id.replace('/uploads/', ''));
    try {
      await fs.unlink(filePath);
    } catch (e) {
      console.error('Failed to delete file:', e);
    }
  }
}
