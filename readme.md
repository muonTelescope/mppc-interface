# MPPPC Interface
Node.js library for the MPPC interface family of boards, this is the master code that communicates with a AVR slave that acutally controls the high voltage supplies. 

### Use

For example to use it on your project instatiate the libray, and call the data function. As it acsesses hardware features, you need sudo in order to run it. The constructior requres the I2C adress of the slave.
```js
var MPPC_INTERFACE = require("./mppc-interface.js");
var mppcInterface = new MPPC_INTERFACE(0x08);
mppcInterface.voltageDump();
```

You can can also call it directly from the command line 

```bash
sudo node -e 'new (require("./mppc-interface"))(0x08).voltageDump();'
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