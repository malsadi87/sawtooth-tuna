import { Injectable } from "@nestjs/common";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { TripEntity } from "../../../entity/trip.entity";
import { SawtoothUtilityService } from "../../core/sawtooth/sawtooth-utility/sawtooth-utility.service";
import { EntitySubscriber } from "../decorator/entitySubscriber.decorator";

@Injectable()
@EntitySubscriber()
export class ChainEntitySubscriber implements EntitySubscriberInterface {
    constructor(private readonly sawtoothUtilityService: SawtoothUtilityService) {
        console.log('subscriber initialized!');
    }

    listenTo(): string | Function {
        return TripEntity
    }

    /**
     * Called after entity insertion.
    */
    afterInsert(event: InsertEvent<any>) {
        console.log(this.sawtoothUtilityService); 
        console.log(`AFTER ENTITY INSERTED: `, event.entity); 
    }

    /**
     * Called after entity update.
    */
    afterUpdate(event: UpdateEvent<any>) {
        console.log(`AFTER ENTITY UPDATED: `, event.entity)
    }


    /**
     * Called after entity removal.
    */
    afterRemove(event: RemoveEvent<any>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity,
        )
    }
}