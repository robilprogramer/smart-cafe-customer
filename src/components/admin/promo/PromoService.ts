import { Promo } from './types';

const API_URL = '/api/promo'; // Sesuaikan dengan endpoint API Anda

export class PromoService {
  // Get all promos
  static async getAll(): Promise<Promo[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch promos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching promos:', error);
      throw error;
    }
  }

  // Get single promo by ID
  static async getById(id: number): Promise<Promo> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch promo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching promo:', error);
      throw error;
    }
  }

  // Create new promo
  static async create(promo: Omit<Promo, 'id'>): Promise<Promo> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo),
      });
      if (!response.ok) {
        throw new Error('Failed to create promo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating promo:', error);
      throw error;
    }
  }

  // Update promo
  static async update(id: number, promo: Omit<Promo, 'id'>): Promise<Promo> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo),
      });
      if (!response.ok) {
        throw new Error('Failed to update promo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating promo:', error);
      throw error;
    }
  }

  // Delete promo
  static async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete promo');
      }
    } catch (error) {
      console.error('Error deleting promo:', error);
      throw error;
    }
  }
}