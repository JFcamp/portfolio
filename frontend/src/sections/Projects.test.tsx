import { describe, expect, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { Projects } from './Projects';
import { projects } from '@/data/projects';

describe('Projects filtering', () => {
  it('shows all projects by default', () => {
    renderWithProviders(<Projects />);
    for (const p of projects) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });

  it('filters to a single category when a filter is clicked', () => {
    renderWithProviders(<Projects />);
    // "Machine Learning" appears both as a filter tab and category label; grab the tab.
    const mlTab = screen.getByRole('tab', { name: 'Machine Learning' });
    fireEvent.click(mlTab);

    const mlProjects = projects.filter((p) => p.category === 'Machine Learning');
    const otherProject = projects.find((p) => p.category === 'Computer Vision');

    expect(screen.getByText(mlProjects[0].name)).toBeInTheDocument();
    if (otherProject) {
      expect(screen.queryByText(otherProject.name)).not.toBeInTheDocument();
    }
  });
});
