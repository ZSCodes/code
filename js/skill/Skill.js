import {DataStore} from "../base/DataStore";

export class Skill {
    static getInstance() {
        if (!Skill.instance) {
            Skill.instance = new Skill();
        }
        return Skill.instance;
    }

    constructor() {
        DataStore.getInstance().skill = new Map([   //胜利连线的参数
            ['speed', false],
            ['shade', false],
        ]);
    }

    restart() {
        for (let key of DataStore.getInstance().skill.keys()) {
            DataStore.getInstance().skill.set(key, false);
        }
    }
}