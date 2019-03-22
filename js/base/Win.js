import {DataStore} from "./DataStore";

//判断胜负
export class Win {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    //判断两个数组是否相等
    check_arr(arr1, arr2) {
        return arr1.length == arr2.length && arr1.every((v, i) => {
            return v == arr2[i]
        })
    }

    //判断地盘是否存在这三个地方
    filter_arr(arr, num) {
        const arr_ = [];
        for (let i = 0; i < 3; i++) {
            arr_.push(arr.filter(item => {
                return item == num[i];
            }))
        }
        return arr_;
    }


    //判断是否我方胜利
    checkOurWin() {
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [1, 2, 3]), [1, 2, 3])) {
            // console.log(1, 2, 3)
            return 1;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [4, 5, 6]), [4, 5, 6])) {
            // console.log(4, 5, 6)
            return 2;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [7, 8, 9]), [7, 8, 9])) {
            // console.log(7, 8, 9)
            return 3;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [1, 4, 7]), [1, 4, 7])) {
            // console.log(1, 4, 7)
            return 4;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [2, 5, 8]), [2, 5, 8])) {
            // console.log(2, 5, 8)
            return 5;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [3, 6, 9]), [3, 6, 9])) {
            // console.log(3, 6, 9)
            return 6;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [1, 5, 9]), [1, 5, 9])) {
            // console.log(1, 5, 9)
            return 7;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.OurAim, [3, 5, 7]), [3, 5, 7])) {
            // console.log(3, 5, 7)
            return 8;
        }
        return 'going';
    }

    //判断是否敌方胜利
    checkEnemyWin() {
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [1, 2, 3]), [1, 2, 3])) {
            // console.log(1, 2, 3)
            return 1;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [4, 5, 6]), [4, 5, 6])) {
            // console.log(4, 5, 6)
            return 2;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [7, 8, 9]), [7, 8, 9])) {
            // console.log(7, 8, 9)
            return 3;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [1, 4, 7]), [1, 4, 7])) {
            // console.log(1, 4, 7)
            return 4;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [2, 5, 8]), [2, 5, 8])) {
            // console.log(2, 5, 8)
            return 5;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [3, 6, 9]), [3, 6, 9])) {
            // console.log(3, 6, 9)
            return 6;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [1, 5, 9]), [1, 5, 9])) {
            // console.log(1, 5, 9)
            return 7;
        }
        if (this.check_arr(this.filter_arr(this.dataStore.EnemyAim, [3, 5, 7]), [3, 5, 7])) {
            // console.log(3, 5, 7)
            return 8;
        }
        return 'going';
    }
}