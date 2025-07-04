const { test, expect } = require('@playwright/test');

test.describe('Flashcard App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page and display a flashcard', async ({ page }) => {
    // Check for the header buttons
    await expect(page.getByRole('button', { name: 'Study' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Quiz' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stats' })).toBeVisible();

    // Check that the flashcard container is visible
    await expect(page.locator('.card-container')).toBeVisible();
  });

  test('should flip the flashcard on click', async ({ page }) => {
    const cardContainer = page.locator('.card-container');

    // Front should be visible first
    await expect(cardContainer.locator('.front')).toBeVisible();
    await expect(cardContainer.locator('.back')).not.toBeVisible();

    // Get the initial word
    const frontWord = await cardContainer.locator('.front h2').textContent();
    expect(frontWord).not.toBeNull();

    // Click to flip
    await cardContainer.click();

    // Back should be visible now
    await expect(cardContainer).toHaveClass(/is-flipped/);
    
    // Check for back content
    await expect(cardContainer.locator('.back h3')).toBeVisible();
    const definition = await cardContainer.locator('.back h3').textContent();
    expect(definition).not.toBeNull();
  });

  test('should have listen buttons on both sides', async ({ page }) => {
    const cardContainer = page.locator('.card-container');

    // Check front
    await expect(cardContainer.locator('.front .listen-btn')).toBeVisible();

    // Flip card
    await cardContainer.click();

    // Check back
    await expect(cardContainer.locator('.back .listen-btn')).toBeVisible();
  });

  test('should show card counter and navigate with prev/next buttons', async ({ page }) => {
    const cardCounter = page.locator('.card-counter');
    await expect(cardCounter).toBeVisible();
    await expect(cardCounter).toHaveText(/\d+\/\d+/);

    const initialText = await cardCounter.textContent();
    const nextButton = page.getByRole('button', { name: 'Next' });
    const prevButton = page.getByRole('button', { name: 'Previous' });

    // Navigate next
    await nextButton.click();
    await expect(cardCounter).not.toHaveText(initialText);
    
    // Navigate previous
    await prevButton.click();
    await expect(cardCounter).toHaveText(initialText);
  });
}); 