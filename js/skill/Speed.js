import {DataStore} from "../base/DataStore";

export class Speed {
    draw() {
        if (DataStore.getInstance().skill.get('speed') === true) {
            DataStore.getInstance().aim_speed = 15;
        }
    }
}