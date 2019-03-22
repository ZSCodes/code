//资源文件加载器，确保canvas在图片资源加载完成后才开始进行渲染
import {Resources} from "./Resources.js";
import {MapResources, PeopleResources} from "./Resources";

export class ResourcesLoader {
    constructor() {
        this.base = new Map(Resources);
        for (let [key, value] of this.base) {
            const image = wx.createImage();
            image.src = value;
            this.base.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.base.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.base.size) {
                    callback(this.base);
                }
            }
        }
    }

    static create() {
        return new ResourcesLoader();
    }
}