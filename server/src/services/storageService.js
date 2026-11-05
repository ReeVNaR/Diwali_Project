import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

/**
 * StorageRepository provides an atomic JSON-based file storage abstraction.
 * Easily swappable for MongoDB / PostgreSQL / Cloud Storage in future versions.
 */
export class JsonStorageRepository {
  constructor(filePath, defaultData = []) {
    this.filePath = filePath;
    this.defaultData = defaultData;
    this.lock = Promise.resolve();
    this._ensureFileExists();
  }

  async _ensureFileExists() {
    try {
      const dir = path.dirname(this.filePath);
      if (!existsSync(dir)) {
        await fs.mkdir(dir, { recursive: true });
      }
      if (!existsSync(this.filePath)) {
        await fs.writeFile(this.filePath, JSON.stringify(this.defaultData, null, 2), 'utf-8');
      }
    } catch (err) {
      console.error(`Failed to initialize storage at ${this.filePath}:`, err);
    }
  }

  /**
   * Concurrency-safe atomic write to file
   */
  async _atomicWrite(data) {
    // Chain onto existing lock promise to serialize writes
    this.lock = this.lock.then(async () => {
      const tempPath = `${this.filePath}.tmp.${Date.now()}.${Math.random().toString(36).substring(7)}`;
      const serialized = JSON.stringify(data, null, 2);
      await fs.writeFile(tempPath, serialized, 'utf-8');
      await fs.rename(tempPath, this.filePath);
    });
    return this.lock;
  }

  async getAll() {
    try {
      await this._ensureFileExists();
      const content = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(content || '[]');
    } catch (err) {
      console.error(`Error reading storage at ${this.filePath}:`, err);
      return [];
    }
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find(item => item.id === id) || null;
  }

  async find(predicate) {
    const items = await this.getAll();
    return items.filter(predicate);
  }

  async insert(item) {
    const items = await this.getAll();
    items.unshift(item);
    await this._atomicWrite(items);
    return item;
  }

  async update(id, updates) {
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    await this._atomicWrite(items);
    return items[index];
  }

  async delete(id) {
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    items.splice(index, 1);
    await this._atomicWrite(items);
    return true;
  }

  async setAll(items) {
    await this._atomicWrite(items);
    return items;
  }
}
