document.addEventListener('alpine:init', () => {
    Alpine.data('filemanager', () => ({
        _setting: {
            baseUrl: '/filemanager/getalldir',
            ajaxParam: {
                cmd: '',
                value: '',
                secondaryValue: '',
            }


        },

        _folderTree:
            [
                {
                    fullPath: '',
                    level: 1,
                    folderName: '',
                    isOpen: true,
                    cssClass: {},

                }
            ],

        init() {
            fetch(this._setting.baseUrl)
                .then(res => res.json())
                .then(json => {

                    this._folderTree = json.sort().map(path => {
                        // Tách chuỗi thành mạng, dựa theo dấu /
                        var tmpArr = path.split("\\");
                        return {
                            folderName: tmpArr[tmpArr.length - 1],
                            fullPath: path,
                            level: tmpArr.length,
                            isOpen: false,
                            cssClass: {
                                [`folder-level-${tmpArr.length}`]: true,
                                show: false,
                            }
                        }
                    });
                    console.log(this._folderTree);
                });
        },


        toggleFolder(idx) {
                
            if (idx >= this._folderTree.length) {
                return;
            }
            this._folderTree[idx].isOpen = !this._folderTree[idx].isOpen;
            var currentLevel = this._folderTree[idx].level;
            this.openFolder(idx, currentLevel);
        },

        openFolder(idx, maxLevel) {
            var isOpen = this._folderTree[idx].isOpen;

            if (isOpen) {
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    if (maxLevel + 1 == this._folderTree[idx + 1].level) {
                        this._folderTree[idx + 1].cssClass.show = true;
                        if (this._folderTree[idx + 1].isOpen) {
                            //De Quy
                            this.openFolder(idx + 1, this._folderTree[idx + 1].level)
                        }
                    }
                    idx++;
                }
            } else {
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    this._folderTree[idx + 1].cssClass.show = false;
                    idx++;
                }
            }
        }




    }));
});