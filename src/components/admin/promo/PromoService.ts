// components/admin/promo/PromoService.ts

import { Promo } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class PromoService {
  /**
   * Get all promos (untuk user dan admin)
   */
  static async getAll(): Promise<Promo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch promos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching promos:', error);
      throw error;
    }
  }

  /**
   * Get active promos only (untuk customer)
   */
  static async getActivePromos(): Promise<Promo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo/active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch active promos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching active promos:', error);
      throw error;
    }
  }

  /**
   * Validate promo code
   */
  static async validatePromoCode(code: string, subtotal: number): Promise<{
    valid: boolean;
    promo?: Promo;
    discountAmount?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, subtotal }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate promo code');
      }

      return await response.json();
    } catch (error) {
      console.error('Error validating promo code:', error);
      throw error;
    }
  }

  /**
   * Get promo by ID
   */
  static async getById(id: number): Promise<Promo> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch promo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching promo:', error);
      throw error;
    }
  }

  /**
   * Create new promo (admin only)
   */
  static async create(promo: Omit<Promo, 'id'>): Promise<Promo> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo`, {
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

  /**
   * Update promo (admin only)
   */
  static async update(id: number, promo: Omit<Promo, 'id'>): Promise<Promo> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo/${id}`, {
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

  /**
   * Delete promo (admin only)
   */
  static async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/promo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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