# Terminal 30 Maestro Mobile Testing

## Prerequisites

1. Ensure you have [Node.js](https://nodejs.org/en/download/) installed (version 14 or higher).
2. Ensure you have [npm](https://www.npmjs.com/get-npm)
3. Ensure you have [Android Studio](https://developer.android.com/studio) installed with an Android Virtual Device (AVD)
   set up.
4. Ensure you have [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
   installed (version 11 or higher).
5. Ensure you have Xcode installed if you plan to run tests on iOS simulators (macOS only).

## How to install Maestro

1. Install Maestro by following the instructions on
   the [official Maestro installation guide](https://docs.maestro.dev/getting-started/installing-maestro).
2. Verify the installation by running the following command in your terminal

```bash
maestro --version
```

3. Run `npm install` in the `access-checkout-react-native-sdk` directory to install the required dependencies

```bash
npm install
```

4. Run `npm install` in the `demo-app` directory to install the required dependencies

```bash
npm install
```

## How to run Maestro locally

1. Start the metro server from the `demo-app` directory

```bash
npm run start
```

2. Press `a` to launch the Android emulator. This will build the app and launch it on the emulator.
3. Wait for the app to load completely on the emulator before proceeding to the next step.
4. Open a new terminal window and navigate to the `demo-app` directory.
5. Run all the maestro tests locally. This will run all the flows against the emulator with the device id
   `emulator-5554`

```bash
maestro --device emulator-5554 test .
```

**(Optional)** If you want to run a specific test file, you can do so by specifying the path to the test file

```bash
maestro --device emulator-5554 test ./path/to/test/flow.yaml
```

**(Optional)** If you want to run a specific test file and generate a report, you can do so by adding the `--format`
flag.

```bash
maestro --device emulator-5554 test ./path/to/test/flow.yaml --format html
```
