# Air New Zealand Flight Booking Automation

This project automates the flight booking process on the Air New Zealand website using Playwright. It includes tests for searching flights, selecting flights, entering passenger details, and selecting seats.

## Table of Contents
- [Air New Zealand Flight Booking Automation](#air-new-zealand-flight-booking-automation)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Test Cases](#test-cases)
    - [Flight Search Functionality](#flight-search-functionality)
    - [Flight Selection and Booking](#flight-selection-and-booking)
    - [Seat Selection](#seat-selection)
  - [Running the Tests](#running-the-tests)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- Playwright installed

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/flight-booking-test.git
    cd flight-booking-test
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Install Playwright browsers:
    ```bash
    npx playwright install
    ```

## Project Structure

```
flight-booking-test/
├── tests/
│   ├── flightSearchPage.js       # Page Object Model for the flight search page
│   ├── flightSelectionPage.js    # Page Object Model for the flight selection page
│   ├── passengerDetailsPage.js   # Page Object Model for the passenger details page
│   ├── seatSelectionPage.js      # Page Object Model for the seat selection page
│   └── flight_booking.spec.js    # Test script for the flight booking process
├── playwright.config.js          # Playwright configuration file
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation
```

## Test Cases

### Flight Search Functionality

1. **Test Case 1**: Verify that the user can search for flights by providing valid origin and destination cities, along with a valid departure date.
2. **Test Case 2**: Verify that the search results display relevant flights based on the user's input.

### Flight Selection and Booking

3. **Test Case 3**: Verify that the user can select a flight from the search results.
4. **Test Case 4**: Verify that the user can proceed to booking after selecting a flight.
5. **Test Case 5**: Verify that the user can enter the passenger details.

### Seat Selection

6. **Test Case 6**: Verify that the user can select seats for the booked flight, if seat selection is available.
7. **Test Case 7**: Verify that the user cannot select seats for the booked flight if seat selection is not available.

## Running the Tests

To run the tests, execute the following command:
```bash
npx playwright test
```

To view the test results, you can open the last HTML report:
```bash
npx playwright show-report
```

## Deployment

To deploy the project on GitHub:

1. Initialize a new Git repository:
    ```bash
    git init
    ```

2. Add the files to the repository:
    ```bash
    git add .
    ```

3. Commit the changes:
    ```bash
    git commit -m "Initial commit"
    ```

4. Create a new repository on GitHub and follow the instructions to add it as a remote repository. Then push your local repository to GitHub:
    ```bash
    git remote add origin https://github.com/yourusername/flight-booking-test.git
    git push -u origin master
    ```

## Contributing

To contribute to this project:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
