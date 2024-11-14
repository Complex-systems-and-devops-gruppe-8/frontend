import { follow, parse, submit, ActionFiller } from '@siren-js/client';
import type { Action, Entity } from '@siren-js/client';

/**
 * Client for making authenticated requests to a Siren API.
 * Handles authentication headers and provides methods for following links and submitting actions.
 * 
 * @class AuthenticatedClient
 * @example
 * ```ts
    const client = new AuthenticatedClient('http://api.example.com');
    client.setAccessToken('jwt-token');
  ```
 */
export class AuthenticatedClient {
  private accessToken: string | null = null;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private getRequestInit(): RequestInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.siren+json',
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return {
      headers
    };
  }

  /**
   * Follows a Siren link and parses the response into the specified type.
   * Automatically handles authentication headers and error cases.
   * 
   * @template T - The expected type of Entity.properties in the parsed response 
   * @param {string} url - The relative URL to follow
   * @throws {Error} When the request is unauthorized (401)
   * @returns {Promise<Entity<T>>} The parsed response data
   * 
   * @example
   * ```typescript
   * interface SomeResource {
   *   id: string;
   *   name: string;
   * }
   * const profile = await client.followAndParse<SomeResource>('/some/resource');
   * ```
   */
  async followAndParse<T extends object>(url: string): Promise<Entity<T>> {
    try {
      const response = await follow(this.baseUrl + url, {
        requestInit: this.getRequestInit()
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      return await parse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Submits a Siren action with optional data and parses the response.
   * Automatically handles authentication headers and error cases.
   * 
   * @template T - The expected type of the parsed response
   * @param {Action} action - The Siren action to submit
   * @param {Record<string, unknown>} [data] - Optional data to include with the action
   * @throws {Error} When the request is unauthorized (401)
   * @returns {Promise<Entity<T>>} The parsed response data
   * 
   * @example
   * ```typescript
   * interface SomeResponse {
   *   token: string;
   * }
   * const response = await client.submitAndParse<SomeResponse>(
   *   someAction,
   *   { dataField1: 'John', dataField2: 'Doe' }
   * );
   * ```
   */
  async submitAndParse<T extends object>(action: Action, data?: Record<string, unknown>): Promise<Entity<T>> {
    try {
      if (data) {
        const filler = new ActionFiller(data);
        action.accept(filler);
      }

      const response = await submit(action, {
        baseUrl: this.baseUrl,
        requestInit: this.getRequestInit()
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      if(response.status === 400) {
        throw new Error('Bad Request');
      }
      if(response.status === 500) {
        throw new Error('Internal Server Error');
      }

      return await parse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw error;
      }
      throw error;
    }
  }
}

export const sirenClient = new AuthenticatedClient(import.meta.env.VITE_API_URL);
