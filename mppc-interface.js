//This is a I2C library for mppcInterface hardware

var I2C = require('raspi-i2c').I2C;

var mppcInterfaceBuffer = new ArrayBuffer(4);
var dataview = new DataView(mppcInterfaceBuffer);

module.exports = class mppcInterface {
    constructor(SLAVE_ADDR) {
        //The slave address of the device allows up to 128 devices on the bus
        this.SLAVE_ADDR = SLAVE_ADDR;
    }

    // Set the voltage of a specific channel
    // sudo node -e 'new (require("./mppcInterface"))(0x08).setTarget(0,55.25);'                
    setTarget(channel, voltage) {
        var CHANNEL_ADDR;
        switch (channel) {
            case 0:
                CHANNEL_ADDR = 0x40;
                break;
            case 1:
                CHANNEL_ADDR = 0x44;
                break;
            case 2:
                CHANNEL_ADDR = 0x48;
                break;
            case 3:
                CHANNEL_ADDR = 0x4C;
                break;
            case 4:
                CHANNEL_ADDR = 0x50;
                break;
            case 5:
                CHANNEL_ADDR = 0x54;
                break;
            case 6:
                CHANNEL_ADDR = 0x58;
                break;
            case 7:
                CHANNEL_ADDR = 0x5C;
                break;
            default:
                throw "Only 8 channels exist on hardware, select number, 0-7";
        }

        this._writeLong(CHANNEL_ADDR, Math.round(voltage * 1000000));

        return 0;
    }

    //Read the voltage of a high voltage module
    // Command line single use example
    // sudo node -e 'new (require("./mppcInterface"))(0x08).readVoltage(0);'            
    readVoltage(channel) {
        var CHANNEL_ADDR;
        switch (channel) {
            case 0:
                CHANNEL_ADDR = 0x00;
                break;
            case 1:
                CHANNEL_ADDR = 0x04;
                break;
            case 2:
                CHANNEL_ADDR = 0x08;
                break;
            case 3:
                CHANNEL_ADDR = 0x0C;
                break;
            case 4:
                CHANNEL_ADDR = 0x10;
                break;
            case 5:
                CHANNEL_ADDR = 0x14;
                break;
            case 6:
                CHANNEL_ADDR = 0x18;
                break;
            case 7:
                CHANNEL_ADDR = 0x1C;
                break;
            default:
                throw "Only 8 channels exist on hardware, select number, 0-7";
        }

        return this._readLong(CHANNEL_ADDR) / 1000000;
    }

    // Read the target voltage of a high voltage module
    // Command line single use example
    // sudo node -e 'new (require("./mppcInterface"))(0x08).readTarget(0);'        
    readTarget(channel) {
        var CHANNEL_ADDR;
        switch (channel) {
            case 0:
                CHANNEL_ADDR = 0x40;
                break;
            case 1:
                CHANNEL_ADDR = 0x44;
                break;
            case 2:
                CHANNEL_ADDR = 0x48;
                break;
            case 3:
                CHANNEL_ADDR = 0x4C;
                break;
            case 4:
                CHANNEL_ADDR = 0x50;
                break;
            case 5:
                CHANNEL_ADDR = 0x54;
                break;
            case 6:
                CHANNEL_ADDR = 0x58;
                break;
            case 7:
                CHANNEL_ADDR = 0x5C;
                break;
            default:
                throw "Only 8 channels exist on hardware, select number, 0-7";
        }

        return this._readLong(CHANNEL_ADDR) / 1000000;
    }

    //Read the temprature of a high voltage module
    // Command line single use example
    // sudo node -e 'new (require("./mppcInterface"))(0x08).readTemp(0);'    
    readTemp(channel) {
        var CHANNEL_ADDR;
        switch (channel) {
            case 0:
                CHANNEL_ADDR = 0x20;
                break;
            case 1:
                CHANNEL_ADDR = 0x24;
                break;
            case 2:
                CHANNEL_ADDR = 0x28;
                break;
            case 3:
                CHANNEL_ADDR = 0x2C;
                break;
            case 4:
                CHANNEL_ADDR = 0x30;
                break;
            case 5:
                CHANNEL_ADDR = 0x34;
                break;
            case 6:
                CHANNEL_ADDR = 0x38;
                break;
            case 7:
                CHANNEL_ADDR = 0x3C;
                break;
            default:
                throw "Only 8 channels exist on hardware, select number, 0-7";
        }
        return this._readLong(CHANNEL_ADDR) / 1000000;
    }

    // Dump all data for specific mppcInterface slave
    // Example single line command line call
    //
    // sudo node -e 'new (require("./mppcInterface"))(0x08).voltageDump();'
    //
    // Yeilds Markdown Compatible output, example
    //
    // |Board   0x08|  Channel 0 |  Channel 1 |  Channel 2 |  Channel 3 |  Channel 4 |  Channel 5 |  Channel 6 |  Channel 7 |
    // |------------|------------|------------|------------|------------|------------|------------|------------|------------|
    // |Target   (V)|  55.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |
    // |Voltage  (V)|  54.981052 |   4.478388 |   4.515167 |   4.510402 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |
    // |Temp     (C)| 191.728096 |  89.277376 |  89.540376 |  89.507904 |   0.000000 |   0.000000 |   0.000000 |   0.000000 |

    voltageDump() {
        console.log("|Board   0x" + ("0" + this.SLAVE_ADDR.toString(16)).slice(-2) + "| " +
            " Channel 0 | " +
            " Channel 1 | " +
            " Channel 2 | " +
            " Channel 3 | " +
            " Channel 4 | " +
            " Channel 5 | " +
            " Channel 6 | " +
            " Channel 7 | "
        );

        console.log(
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|------------" +
            "|"
        );


        console.log("|Target   (V)| " +
            ("  " + this.readTarget(0).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(1).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(2).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(3).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(4).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(5).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(6).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTarget(7).toFixed(6).toString()).slice(-10) + " | "
        );

        console.log("|Voltage  (V)| " +
            ("  " + this.readVoltage(0).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(1).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(2).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(3).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(4).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(5).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(6).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readVoltage(7).toFixed(6).toString()).slice(-10) + " | "
        );

        console.log("|Temp     (C)| " +
            ("  " + this.readTemp(0).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(1).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(2).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(3).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(4).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(5).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(6).toFixed(6).toString()).slice(-10) + " | " +
            ("  " + this.readTemp(7).toFixed(6).toString()).slice(-10) + " | "
        );
    }

    //Reads four bytes from i2c, and returns them as a long, Private.
    _readLong(ADDR) {
        var i2c = new I2C();
        var tries = 0;
        var maxTries = 3;
        while (true) {
            try {
                i2c.writeByteSync(this.SLAVE_ADDR, ADDR);
                break;
            } catch (EIO) {
                tries++;
                if (maxTries <= tries) {
                    throw "Can not write byte, Slave(" + this.SLAVE_ADDR + "), Address(" + ADDR + ")";
                }
            }
        }
        for (var byte = mppcInterfaceBuffer.byteLength - 1; byte >= 0; byte--) {
            dataview.setUint8(byte, i2c.readByteSync(this.SLAVE_ADDR));
        }
        return dataview.getInt32(0);
    }

    //Writes four bytes out, Private.
    _writeLong(ADDR, long) {
        var i2c = new I2C();
        dataview.setInt32(0, long);
        for (var byte = 0; byte < mppcInterfaceBuffer.byteLength; byte++) {
            i2c.writeByteSync(this.SLAVE_ADDR, ADDR + byte, dataview.getUint8(mppcInterfaceBuffer.byteLength - byte - 1));
        }
    }
}