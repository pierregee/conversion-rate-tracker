import { expect, test, Page } from "@playwright/test";

const apiUrl = "**/.netlify/functions/index*";
const mainPage = "http://localhost:3000";

interface MockApiResponseOptions {
  status: number;
  body?: { conversionRate: string };
  delay?: number;
}

async function mockApiResponse(page: Page, options: MockApiResponseOptions) {
  const { status, body, delay = 0 } = options;

  await page.route(apiUrl, (route) => {
    setTimeout(() => {
      route.fulfill({ status, body: JSON.stringify(body) });
    }, delay);
  });
}

test("should show loading state initially", async ({ page }) => {
  await mockApiResponse(page, {
    status: 200,
    body: { conversionRate: "123.456" },
    delay: 500,
  });

  await page.goto(mainPage);

  await expect(page.locator(".loading")).toBeVisible();
  await expect(page.locator(".rate")).toContainText("123.456");
  await expect(page.locator(".loading")).not.toBeVisible();
});

test("should display the conversion rate when data is loaded", async ({
  page,
}) => {
  await mockApiResponse(page, {
    status: 200,
    body: { conversionRate: "123.456" },
  });

  await page.goto(mainPage);

  await expect(page.locator(".loading")).not.toBeVisible();
  await expect(page.locator(".rate")).toContainText("123.456");
});

test("should handle errors gracefully", async ({ page }) => {
  await mockApiResponse(page, {
    status: 500,
  });
  await page.goto(mainPage);
  await expect(page.locator(".loading")).not.toBeVisible();
  await expect(page.locator(".error")).toBeVisible();
});

test("NetworkDropdown should update the network and URL when an option is clicked", async ({
  page,
}) => {
  await mockApiResponse(page, {
    status: 200,
    body: { conversionRate: "123.456" },
  });

  await page.goto(mainPage);

  await expect(page.locator("#menu-button")).toContainText("mainnet");

  await page.click("#menu-button");

  await page.click('a[role="menuitem"]:has-text("holesky")');

  await expect(page.locator("#menu-button")).toContainText("holesky");
});
