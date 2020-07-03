const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'titles',
    tabContent: 'content',
    activeTitle: 'active',
    activeContent: 'content_active',
    borderRadiusTR: 'border-top-right-radius',
    borderRadius: 'borderradius',
    borderLeft: 'border-left',
    borderRight: 'border-right'
}
const tabs = document.getElementsByClassName(cList.tabWrap);
console.log("tabs", tabs);

const config = [];
(function() {
    for(const tab of tabs){       
        const param = tab.getAttribute('param');
        config.push((!isNaN(param) && param !== undefined && (param == 1 || param == 0)) ? param : 0); 
    }
})();
    
console.log("config", config);

const getParams = (el, param) => parseInt(getComputedStyle(el).getPropertyValue(param));
const getTabPart = (tabPart, classPart, i = 0) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[i].classList.add(classPart); 
};

const getActiveComtent = (tabTitleArr) => {
    return new Promise((resolve, reject) => {
        let contentActive = [];
        for (const i of tabTitleArr) { i.classList.contains('content_active') ? contentActive.push(i) : null};
        setTimeout(() => { resolve(contentActive[0]); }, 1);
    });
};


for (let t = 0; t < tabs.length; t++) {
    let sumWidth = 0;
    const events = ['load', 'resize', 'click'], titles = [], contents = [];
    // const titles = tabs[t].getElementsByClassName(cList.tabTitle)[0].children;
    for(const part of tabs[t].children){    
        if (part.classList.contains('titles')) { for(const child of part.children) { titles.push(child) }};     
        part.classList.contains('content') ? contents.push(part) : null;
    }
    // console.log("titles", titles);
    // console.log("contents", contents);    
    getTabPart(titles, cList.activeTitle);
    getTabPart(contents, cList.activeContent);
    const contentBorderRadius = getParams(contents[0], cList.borderRadiusTR); 
    // console.log("contentBorderRadius", contentBorderRadius);
    for (let i = 0; i < titles.length; i++) {   


        sumWidth += titles[i].clientWidth + getParams(titles[i], cList.borderLeft) + getParams(titles[i], cList.borderRight);
        console.log("sumWidth", sumWidth);

        for(const event of events){
            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {

                    console.clear();                    

                    getTabPart(this.parentElement.children, cList.activeTitle, i);
                    getTabPart(contents, cList.activeContent, i);


                }           
                getActiveComtent($(tabs[t]).children()).then((contentActive) => {                
                
                    // console.log("+++++++++++++", contentActive);   

                    
                    const contentWidth = contentActive.clientWidth + getParams(contentActive, cList.borderLeft) + getParams(contentActive, cList.borderRight);
                    
                    // console.log("config[t]", config[t]);

                    sumWidth = (config[t] == 1) ? contentWidth : sumWidth;

                    // console.log("sumWidth222222222", sumWidth);

                    titles[i].classList.remove(cList.borderRadius);
                    titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;

                    titles[i].style.flexGrow = (config[t] == 1) ? config[t] 
                        : ((config[t] == 0) && (sumWidth >= contentWidth)) ? 1 : 0;
                    contentActive.style.borderTopRightRadius = (sumWidth >= contentWidth) ? '0px' 
                        : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                        : `${contentBorderRadius}px`;

                });
            });
        };
    };
};



