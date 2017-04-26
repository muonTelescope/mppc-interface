# MPPPC Interface
Node.js library for the MPPC interface family of boards, this is the master code that communicates with a AVR slave that controls the high voltage supplies. 

### Use
For example, to use it on your project instantiate the library, and call the data function. As it accesses hardware features, you need sudo to run it. The constructor requires the I2C address of the slave. Include it in your `package.json` dependency tree with
```javascript
"dependencies": {
  "mppc-interface": "muonTelescope/mppc-interface"
}
```
After `npm install` 
```javascript
var MPPC_INTERFACE = require("mppc-interface");
var mppcInterface = new MPPC_INTERFACE(0x08);
mppcInterface.voltageDump();
```

You can also call it directly from the command line 

```bash
sudo node -e 'new (require("mppc-interface"))(0x08).voltageDump();'
```

### Response
There are a few functions but the voltage dump provides voltages, temps, and targets for all 8 channels. It prints out to the terminal in a markdown compatible table. The target voltage is compensated for 25 C.
```md
|Board   0x08|  Channel 0 |  Channel 1 |  Channel 2 |  Channel 3 |  Channel 4 |  Channel 5 |  Channel 6 |  Channel 7 |
|------------|------------|------------|------------|------------|------------|------------|------------|------------|
|Target   (V)|  55.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |
|Voltage  (V)|  54.981052 |   4.478388 |   4.515167 |   4.510402 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |
|Temp     (C)| 191.728096 |  89.277376 |  89.540376 |  89.507904 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |
```

### Functions
A table of all public functions. SLAVE_ADDR is the only public variable that gets set during construction.

| Function                      | Action                                               | Return |
|-------------------------------|------------------------------------------------------|--------|
| setTarget(channel, voltage)   | Sets the voltage for the channel                     | void   |
| readVoltage(channel)          | Reads voltage from channel                           | Number |
| readTarget(channel)           | Reads target voltage at 25C                          | Number |
| readTemp(channel)             | Read temperature in C                                 | Number |
| data()                        | Object containing voltage, target, and temp          | Object |
| voltageDump()                 | Print to console MD formatted voltage target temp    | void   |

