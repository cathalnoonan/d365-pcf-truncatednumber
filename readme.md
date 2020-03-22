# D365 PCF - Truncated Number Control
Displays the value of a number field truncated to remove trailing zeros

<img src="./img/d365-pcf-truncatednumber.gif" />

## Installation
Download the solution from the <a href="https://github.com/cathalnoonan/d365-pcf-truncatednumber/releases">Releases page</a>

The recommended approach would be to install the managed solution as the controls are not editable from within D365

If the control must be added to another solution that will be deployed to other environments, then installing the un-managed solution will be a better option


## Building the component
If you wish to build the control yourself, follow the steps below

#### Prerequisites
- NPM is installed (this is bundled with Nodejs)
- Visual Studio Developer command prompt is installed (this is bundled with Visual Studio)
- Access to the internet to download packages from NPM

#### Steps
1. Clone this repository
2. Open a command prompt or terminal in the `src` directory
3. Run the following command
> `npm install`
4. Open `Developer Command Prompt for Visual Studio`
5. CD to the `solution` directory
7. Restore the MSBUILD dependencies and build the project by running the following command
> msbuild /t:build /restore

#### Subsequent builds
Subsequent builds after restoring the msbuild dependencies require the following command
> msbuild


#### Production builds
If looking to build the control as `Release` and have the msbuild dependencies installed, run the following command
> msbuild /p:Configuration=Release