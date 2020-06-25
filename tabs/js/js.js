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

// const config = { tabTitileParams: `${(function() {
//     for(const tab of tabs){       
//         const param = tab.getAttribute('param');
//         return (!isNaN(param) && param !== undefined && (param == 1 || param == 0)) ? param : 0; 
//     }})()}`};
        
// console.log("config", config);

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


for (let t = 0; t < tabs.length; t++) {
    let sumWidth = 0;
    const events = ['load', 'resize', 'click'];
    const titles = tabs[t].getElementsByClassName(cList.tabTitle)[0].children;
    
    console.log("titles", titles);

    const contents = [];
    for(const content of tabs[t].children){         
        content.classList.contains('content') ? contents.push(content) : null;
    }

    console.log("contents", contents);
    
    getTabPart(titles, cList.activeTitle);
    getTabPart(contents, cList.activeContent);
    const contentBorderRadius = getParams(contents[0], cList.borderRadiusTR); 
    for (let i = 0; i < titles.length; i++) {    
        sumWidth += titles[i].clientWidth + getParams(titles[i], cList.borderLeft) + getParams(titles[i], cList.borderRight);
        for(const event of events){
            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {
                    getTabPart(this.parentElement.children, cList.activeTitle, i);
                    getTabPart(contents, cList.activeContent, i);
                }

                // console.log("iiii", tabs[t]);
                
                const contentActive = tabs[t].getElementsByClassName(cList.activeContent)[0];
                const contentWidth = contentActive.clientWidth + getParams(contentActive, cList.borderLeft) + getParams(contentActive, cList.borderRight);
                sumWidth = (config[t] == 1) ? contentWidth : sumWidth;
                titles[i].classList.remove(cList.borderRadius);
                titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;
                titles[i].style.flexGrow = (config[t] == 1) ? config[t] 
                    : ((config[t] == 0) && (sumWidth >= contentWidth)) ? 1 : 0;
                contentActive.style.borderTopRightRadius = (sumWidth >= contentWidth) ? '0px' 
                    : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                    : `${contentBorderRadius}px`;
            });
        };
    };
};



// for (const tab of tabs){
//     let sumWidth = 0;
//     const events = ['load', 'resize', 'click'];
//     const titles = tab.getElementsByClassName(cList.tabTitle)[0].children;
//     const contents = tab.getElementsByClassName(cList.tabContent);
//     getTabPart(titles, cList.activeTitle);
//     getTabPart(contents, cList.activeContent);
//     const contentBorderRadius = getParams(contents[0], cList.borderRadiusTR); 
//     for (let i = 0; i < titles.length; i++) {    
//         sumWidth += titles[i].clientWidth + getParams(titles[i], cList.borderLeft) + getParams(titles[i], cList.borderRight);
//         for(const event of events){
//             ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
//                 if (event === 'click') {
//                     getTabPart(this.parentElement.children, cList.activeTitle, i);
//                     getTabPart(contents, cList.activeContent, i);
//                 }
//                 const contentActive = tab.getElementsByClassName(cList.activeContent)[0];
//                 const contentWidth = contentActive.clientWidth + getParams(contentActive, cList.borderLeft) + getParams(contentActive, cList.borderRight);
//                 sumWidth = (config.tabTitileParams == 1) ? contentWidth : sumWidth;
//                 titles[i].classList.remove(cList.borderRadius);
//                 titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;
//                 titles[i].style.flexGrow = (config.tabTitileParams == 1) ? config.tabTitileParams 
//                     : ((config.tabTitileParams == 0) && (sumWidth >= contentWidth)) ? 1 : 0;
//                 contentActive.style.borderTopRightRadius = (sumWidth >= contentWidth) ? '0px' 
//                     : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
//                     : `${contentBorderRadius}px`;
//             });
//         };
//     };
// };