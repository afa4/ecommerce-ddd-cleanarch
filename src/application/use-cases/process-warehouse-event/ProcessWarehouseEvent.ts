import UseCase from "../UseCase";
import ProcessWarehouseEventInput from "./ProcessWarehouseEventInput";
import WarehouseEventRepository from "../../../domain/repository/WarehouseEventRepository";

export default class ProcessWarehouseEvent implements UseCase<ProcessWarehouseEventInput, void> {

    constructor(private readonly warehouseEventRepository: WarehouseEventRepository) {
    }

    execute(input: ProcessWarehouseEventInput): Promise<void> {
        return Promise.resolve(undefined);
    }
}
