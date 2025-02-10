import {BOAT_STATUS_CODES, BOAT_TYPE_CODES} from "@/lib/constants/boat-type";
import {components} from "@/api/api";

export type BoatType = (typeof BOAT_TYPE_CODES)[keyof typeof BOAT_TYPE_CODES];

export type BoatStatus =
    (typeof BOAT_STATUS_CODES)[keyof typeof BOAT_STATUS_CODES];

export type Boat = components["schemas"]["Boats"];
