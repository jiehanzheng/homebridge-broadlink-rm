# Homebridge Broadlink RM Pro w/ Fahrenheit temperatures for air conditioners

## Jiehan's fork
Installation:
```
npm install git+https://github.com/jiehanzheng/homebridge-broadlink-rm.git
```

I tried to submit a [pull request](https://github.com/kiwi-cam/homebridge-broadlink-rm/pull/498) which was was ignored.  So unfortunately I will be using this fork moving forward.  Here is what this fork does:

### Context
My IR remote control PAR-SL100A-E controls the AC in 1 degree Fahrenheit increments (approximately 0.5 degrees Celsius).

This plugin currently sets a `minStep` of 1, so Home app will only send integer target temperatures in Celsius.  This conversion causes the Home app to "skip" many Fahrenheit set points.

I want to make available to HomeKit every Fahrenheit set point that my IR remote control supports.

### Proposed approach
* Allow temperature with decimal points in the `data` JSON map
* If decimal points are detected in the config, set `minStep` to 0.1 to allow HomeKit to send more accurate target temperatures
* Add fuzzy matching logic inside `getTemperatureHexData` when it is doing the lookup:
  * Find the closest match temperature with the correct prefix in the `data` JSON
  * If the temperature difference is less than 1 degree Celsius, return hex code for the closest defined temperature
  * Otherwise return null (have `getTemperatureHexData` handle this as usual)

### Sample config
```
                    "data": {
                        "off": "26006c...",
                        "temperature24.4": {
                            "data": "26006c...",
                            "pseudo-mode": "cool"
                        },
                        "temperature20.6": {
                            "data": "26006c...",
                            "pseudo-mode": "heat"
                        },
                        "heat17.2": {
                          // ...
```
Template JSON with F -> C mapping for 50F to 90F:
https://github.com/jiehanzheng/homebridge-broadlink-rm/blob/master/jz-codes.json

## Introduction
Welcome to the Broadlink RM Mini and Broadlink RM Pro plugin for [Homebridge](https://github.com/nfarina/homebridge).

This plugin allows you to control your RM Mini and RM Pro with HomeKit using the Home app and Siri.

## Like this plugin?

If you like this plugin and want to show your support then please star the Github repo, or better yet; buy me a drink using [Paypal](https://paypal.me/kiwicamRM).

Thank you!

## Installation

This plugin can be added via the Web interface, or if you perfer the terminal:
   `npm install -g homebridge-broadlink-rm-pro`
For more information, refer to the [documentation](https://broadlink.kiwicam.nz/#installation).

## Documentation

**Documentation can be found [here](https://broadlink.kiwicam.nz).** If you have any trouble after reading through the information please raise an issue and we'll help out as best we can.

If the plugin is unable to discover your device, it's likely you've locked the device with the cloud so it no longer accepts local connections. In this case, follow these steps:
1. Open the [Broadlink app](https://apps.apple.com/us/app/broadlink/id1450257910)
2. From the Home screen, tap on your Broadlink device
3. Tap the ... in the top right
4. Scroll down and toggle "Lock device" to Off
5. Tap OK when prompted "Confirm to unlock the device"

<img src="https://i.imgur.com/DMTUbDo.png" width="40%" height="40%">

This plugin should now be able to discover your device.

## Thanks
Original: Thanks to @tattn (https://github.com/tattn/homebridge-rm-mini3), @PJCzx (https://github.com/PJCzx/homebridge-thermostat), @momodalo (https://github.com/momodalo/broadlinkjs), and @lprhodes (https://github.com/lprhodes/homebridge-broadlink-rm) whose time and effort got this started.

In this fork: Thanks to @kiwi-cam (https://github.com/kiwi-cam), @Cloudore (https://github.com/Cloudore) and @Faisalthe01 (https://github.com/Faisalthe01) for your work!
