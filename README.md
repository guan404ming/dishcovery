# Dishcovery 🍽️

[![Lint Tests](https://github.com/guan404ming/dishcovery/actions/workflows/code-check.yml/badge.svg)](https://github.com/guan404ming/dishcovery/actions/workflows/code-check.yml)
[![Lint Tests](https://github.com/guan404ming/dishcovery/actions/workflows/test.yml/badge.svg)](https://github.com/guan404ming/dishcovery/actions/workflows/test.yml)

<p align="center">
  <img width="375" alt="Screen Shot 2024-08-06 at 4 08 34 PM" src="https://github.com/user-attachments/assets/4d0e882a-5178-4680-86a2-7f53d9f1e0fc">
</p>

- We have created a community-driven platform dedicated to reducing food waste. On this website, users can:

    **Share surplus food** - Have extra food? Share it here with those in need.

    **Find nearby food** - Check what food is available for pickup in your area.

    **Manage restaurant inventory** - Restaurants can manage soon-to-expire food and offer it to those in need.

- **Deployed link:** [Dishcovery - Community-Driven Food Sharing Platform](https://dishcovery.guan404ming.com/)

### 🍽️ Feature Introduction

- **Users:**
    - Google OAuth2.0 login
    - Update personal profile
    - User statistics (number of posts / number of reservations)
- **Posts:**
    - List all posts and filter by type
    - Display location and available food for each post
    - Sort posts by newest / most popular
    - Support for uploading images and adding descriptions
    - Delete and edit posts
- **Reservations:**
    - Reserve food from posts
    - View reservation history
    - Cancel reservations
- **Restaurants:**
    - Manage inventory
    - Create food items
    - View reservations
- **Interface:**
    - Responsive design
    - Map view

### 🍽️ Frameworks / Modules / Third-Party Packages Used

#### Frontend:
- React.js, Next.js
- UI components: shadcn-ui, lucide-react
- Map functionality: @googlemaps/react-wrapper, @vis.gl/react-google-maps
- Authentication: next-auth
- File upload: @uploadthing/react

#### Backend:
- Next.js API Routes
- Database operations: drizzle-orm, drizzle-zod
- Database: @vercel/postgres, pg

#### Testing:
- Unit testing: Jest, @testing-library/jest-dom, @testing-library/react
- End-to-end testing: Cypress

#### Development Tools:
- Code formatting and linting: eslint, prettier, @trivago/prettier-plugin-sort-imports, prettier-plugin-tailwindcss
- Type checking: typescript

### 🍽️ How to Install and Test on Localhost

1. Clone this repository:
   ```
   git clone https://github.com/guan404ming/dishcovery.git
   cd dishcovery
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root
   - Add necessary environment variables (e.g., database URL, API keys, etc.)

4. Run the development server:
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🍽️ Deployment

This project is deployed using Vercel. Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### 🍽️ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### 🍽️ License

[MIT](https://choosealicense.com/licenses/mit/)
