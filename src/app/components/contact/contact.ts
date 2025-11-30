import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  // UI state
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};

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
    try {
      const resp = await fetch(environment.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.ok) {
        this.successMessage = 'Thanks — your message was sent.';
        form.reset();
      } else {
        // Map Formspree field errors (if any) to fieldErrors
        if (data && Array.isArray(data.errors)) {
          data.errors.forEach((err: any) => {
            if (err.field) this.fieldErrors[err.field] = err.message || 'Invalid value.';
          });
        }
        this.errorMessage = data?.message || 'Sorry — there was a problem sending your message.';
      }
    } catch (err) {
      console.error('Network error', err);
      this.errorMessage = 'Network error — please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.fieldErrors = {};
  }

}
