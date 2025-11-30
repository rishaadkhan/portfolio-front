import { Component, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  constructor(private cdr: ChangeDetectorRef) {}
  // UI state
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};
  private messageTimeoutId: any = null;

  /**
   * Submit handler: gathers form data and POSTs to Formspree.
   * Adds client-side validation, shows inline success/error messages,
   * and disables the submit button while sending.
   */
  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();
    this.clearMessages();
    const form = e.target as HTMLFormElement;

    // Gather values
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value?.trim() || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value?.trim() || '';

    // Client-side validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!name) this.fieldErrors['name'] = 'Please enter your name.';
    if (!email) this.fieldErrors['email'] = 'Please enter your email.';
    else if (!emailRegex.test(email)) this.fieldErrors['email'] = 'Please enter a valid email address.';
    if (!message) this.fieldErrors['message'] = 'Please enter a message.';
    else if (message.length < 10) this.fieldErrors['message'] = 'Message must be at least 10 characters.';

    if (Object.keys(this.fieldErrors).length > 0) {
      this.errorMessage = 'Please correct the errors below and try again.';
      return;
    }

    // Build FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    this.isLoading = true;
    console.debug('[contact] submit: starting, isLoading=true');
    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.warn('[contact] submit: timeout reached — clearing isLoading to avoid infinite loader');
        this.isLoading = false;
        this.errorMessage = this.errorMessage || 'Request timed out. Please try again.';
      }
    }, 15000);
    try {
      console.debug('[contact] fetch: sending request to', environment.FORMSPREE_ENDPOINT);
      const resp = await fetch(environment.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });
      console.debug('[contact] fetch: response received, status=', resp.status);
      const data = await resp.json().catch(() => ({}));
      console.debug('[contact] fetch: parsed body', data);

      if (resp.ok) {
        console.debug('[contact] submit: success branch');
        this.successMessage = 'Thanks — your message was sent.';
        form.reset();
        // clear any previous message timer and set a new one to auto-hide messages
        this.clearMessageTimeout();
        this.setMessageTimeout();
        // ensure template updates (some runtimes/optimizations may need an explicit CD tick)
        this.cdr.detectChanges();
      } else {
        console.debug('[contact] submit: non-ok response');
        // Map Formspree field errors (if any) to fieldErrors
        if (data && Array.isArray(data.errors)) {
          data.errors.forEach((err: any) => {
            if (err.field) this.fieldErrors[err.field] = err.message || 'Invalid value.';
          });
        }
        this.errorMessage = data?.message || 'Sorry — there was a problem sending your message.';
        this.clearMessageTimeout();
        this.setMessageTimeout();
        this.cdr.detectChanges();
      }
    } catch (err) {
      console.error('[contact] submit: network error', err);
      this.errorMessage = 'Network error — please try again later.';
      this.clearMessageTimeout();
      this.setMessageTimeout();
      this.cdr.detectChanges();
    } finally {
      clearTimeout(timeoutId);
      this.isLoading = false;
      console.debug('[contact] submit: finished, isLoading=false');
      // force change detection to ensure UI updates immediately
      this.cdr.detectChanges();
    }
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.fieldErrors = {};
    this.clearMessageTimeout();
  }

  private setMessageTimeout(): void {
    // hide messages after ~3 seconds
    this.messageTimeoutId = setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
      this.fieldErrors = {};
      try {
        this.cdr.detectChanges();
      } catch (e) {
        // ignore
      }
      this.messageTimeoutId = null;
    }, 3000);
  }

  private clearMessageTimeout(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
      this.messageTimeoutId = null;
    }
  }

}
