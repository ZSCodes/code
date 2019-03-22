import {Skill} from "../js/skill/Skill";
import {DataStore} from "../js/base/DataStore";

export class robot_server {
    static getInstance() {
        if (!robot_server.instance) {
            robot_server.instance = new robot_server();
        }
        return robot_server.instance;
    }

    constructor() {

    }

    playing() {
        Skill.getInstance().restart();
        DataStore.getInstance().aim_state = false;
        DataStore.getInstance().time_state = false;
        DataStore.getInstance().touch_state = false;
        DataStore.getInstance().robot_round = DataStore.getInstance().robot_round + 1;
        DataStore.getInstance().time_num = 10;
        DataStore.getInstance().aim_speed = 6;
        DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
        DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
        if (DataStore.getInstance().user_round == 'our') {
            DataStore.getInstance().user_round = 'enemy';
        } else if (DataStore.getInstance().user_round == 'enemy') {
            DataStore.getInstance().user_round = 'our';
        }
        if (DataStore.getInstance().ready_timer) {
            clearTimeout(DataStore.getInstance().ready_timer);
        }
        DataStore.getInstance().robot_time = 10
        DataStore.getInstance().speak = true;
        if (DataStore.getInstance().ready_timer) {
            clearTimeout(DataStore.getInstance().ready_timer);
        }
        DataStore.getInstance().ready_timer = setTimeout(() => {
            DataStore.getInstance().speak = false;
            DataStore.getInstance().robot_timer = setInterval(() => {
                DataStore.getInstance().robot_time = DataStore.getInstance().robot_time - 1;
                DataStore.getInstance().time_num = DataStore.getInstance().robot_time;
                if (DataStore.getInstance().robot_time == 9) {
                    DataStore.getInstance().aim_state = true;
                    DataStore.getInstance().time_state = true;
                    DataStore.getInstance().touch_state = true;
                    if (DataStore.getInstance().robot_enemy) {
                        clearTimeout(DataStore.getInstance().robot_enemy)
                    }
                    this.enemy_action();
                } else if (DataStore.getInstance().robot_time <= 1) {
                    if (DataStore.getInstance().robot_timer) {
                        clearInterval(DataStore.getInstance().robot_timer);
                    }
                    setTimeout(() => {
                        this.playing();
                    }, 1000)
                }
            }, 1000)
        }, 2000)
    }

    enemy_action() {
        let round_num = DataStore.getInstance().robot_round - 1;
        let time__ = DataStore.getInstance().robot_data.one[round_num];
        console.log(time__)

        if (time__ && time__ != 'none') {
            DataStore.getInstance().robot_enemy = setTimeout(() => {
                if (DataStore.getInstance().user_round == 'enemy') {
                    if (DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.195 && DataStore.getInstance().aim_Y == DataStore.getInstance().width * 0.5) {
                        console.log('命中1号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 1
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 1
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.08 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.5 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.08;
                            DataStore.getInstance().hit_y = 0.5;
                            DataStore.getInstance().EnemyAim.push(1);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.265 && DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.495 && DataStore.getInstance().aim_Y == DataStore.getInstance().width * 0.5) {
                        console.log('命中2号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 2
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 2
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.38 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.5 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.38;
                            DataStore.getInstance().hit_y = 0.5;
                            DataStore.getInstance().EnemyAim.push(2);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.565 && DataStore.getInstance().aim_Y < DataStore.getInstance().width * 0.61) {
                        console.log('命中3号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 3
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 3
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.68 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.5 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.68;
                            DataStore.getInstance().hit_y = 0.5;
                            DataStore.getInstance().EnemyAim.push(3);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.565 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.68 && DataStore.getInstance().aim_Y < DataStore.getInstance().width * 0.9) {
                        console.log('命中6号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 6
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 6
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.68 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.79 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.68;
                            DataStore.getInstance().hit_y = 0.79;
                            DataStore.getInstance().EnemyAim.push(6);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.495 && DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.265 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.68 && DataStore.getInstance().aim_Y < DataStore.getInstance().width * 0.9) {
                        console.log('命中5号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 5
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 5
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.38 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.79 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.38;
                            DataStore.getInstance().hit_y = 0.79;
                            DataStore.getInstance().EnemyAim.push(5);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.195 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.68 && DataStore.getInstance().aim_Y < DataStore.getInstance().width * 0.9) {
                        console.log('命中4号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 4
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 4
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.08 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (0.79 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.08;
                            DataStore.getInstance().hit_y = 0.79;
                            DataStore.getInstance().EnemyAim.push(4);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.195 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.97) {
                        console.log('命中7号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 7
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 7
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.08 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (1.08 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.08;
                            DataStore.getInstance().hit_y = 1.08;
                            DataStore.getInstance().EnemyAim.push(7);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.265 && DataStore.getInstance().aim_X < DataStore.getInstance().width * 0.495 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.97) {
                        console.log('命中8号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 8
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 8
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.38 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (1.08 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.38;
                            DataStore.getInstance().hit_y = 1.08;
                            DataStore.getInstance().EnemyAim.push(8);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else if (DataStore.getInstance().aim_X > DataStore.getInstance().width * 0.565 && DataStore.getInstance().aim_Y > DataStore.getInstance().width * 0.97) {
                        console.log('命中9号格')
                        DataStore.getInstance().touch_state = false;
                        if (DataStore.getInstance().robot_timer) {
                            clearInterval(DataStore.getInstance().robot_timer)
                        }
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        if (DataStore.getInstance().OurAim.findIndex((value) => {
                            return value == 9
                        }) == -1 && DataStore.getInstance().EnemyAim.findIndex((value) => {
                            return value == 9
                        }) == -1) {
                            //投掷命中
                            DataStore.getInstance().throw_x = DataStore.getInstance().width * (0.68 - 1);   //投掷过程的X轴坐标（起始位置）
                            DataStore.getInstance().throw_y = DataStore.getInstance().width * (1.08 - 1);   //投掷过程的Y轴坐标（起始位置）
                            DataStore.getInstance().hit_x = 0.68;
                            DataStore.getInstance().hit_y = 1.08;
                            DataStore.getInstance().EnemyAim.push(9);
                            DataStore.getInstance().throw_state = 'enemy';
                        } else {
                            setTimeout(() => {
                                robot_server.getInstance().playing();
                            }, 1000)
                        }
                    } else {
                        DataStore.getInstance().touch_state = false;
                        DataStore.getInstance().aim_state = false;
                        DataStore.getInstance().time_state = false;
                        Skill.getInstance().restart();
                        DataStore.getInstance().miss_state = true;
                    }
                } else if (DataStore.getInstance().user_round == 'our') {
                    if (DataStore.getInstance().touch_state === true) {
                        DataStore.getInstance().skill.set('speed', true);
                    }
                }
            }, (9 - time__) * 1000)
        }
    }
}