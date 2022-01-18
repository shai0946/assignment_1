export interface ProcessElement {
    CustomerId: string,
    CustomerName: string,
    MachineId: string,
    MachineNr: string,
    MachineTypeSerial: string,
    OnlineFrom: string,
    Process: string,
    ProcessTime: object,
    SensorData: object
}

export interface processTable {
    CustomerId: string,
    CustomerName: string,
    MachineNr: string,
    MachineId: string,
    MachineTypeSerial: string,
    Process: string,
    ProcessTimeStart: string,
    ProcessTimeEnd: string,
    SensorDataWaterTemp: string,
    SensorDataPump10: string,
    SensorDataPump5: string,
    SensorDataDrainSensor: string,
    SensorDataWaterLevel: string,
    OnlineFrom: string
  }