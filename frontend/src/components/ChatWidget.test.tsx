import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { ChatWidget } from './ChatWidget';
import * as api from '@/services/api';

vi.mock('@/services/api');

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows suggestions when opened and empty', () => {
    renderWithProviders(<ChatWidget open setOpen={() => {}} />);
    // English default suggestion
    expect(
      screen.getByText("What are Pedro's strongest ML skills?"),
    ).toBeInTheDocument();
  });

  it('sends a message and renders the answer with sources', async () => {
    vi.mocked(api.sendChat).mockResolvedValue({
      answer: 'Pedro uses Python and FastAPI.',
      sources: [{ source: 'skills.md', project: 'Skills' }],
      confidence: 0.8,
    });

    renderWithProviders(<ChatWidget open setOpen={() => {}} />);

    const textarea = screen.getByPlaceholderText(/Ask about/i);
    fireEvent.change(textarea, { target: { value: 'What does Pedro use?' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    await waitFor(() =>
      expect(screen.getByText('Pedro uses Python and FastAPI.')).toBeInTheDocument(),
    );
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(api.sendChat).toHaveBeenCalledOnce();
  });

  it('shows an error state when the request fails', async () => {
    vi.mocked(api.sendChat).mockRejectedValue(new Error('boom'));

    renderWithProviders(<ChatWidget open setOpen={() => {}} />);
    const textarea = screen.getByPlaceholderText(/Ask about/i);
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    await waitFor(() =>
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument(),
    );
  });
});
