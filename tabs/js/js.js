const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'kal_titles',
    tabContent: 'kal_content',
    activeTitle: 'kal_tab_active',
    activeContent: 'kal_content_active',
    borderRadius: 'kal_borderradius',
    borderRadiusTR: 'border-top-right-radius',
    borderRadiusTL: 'border-top-left-radius',
    borderLeft: 'border-left',
    borderRight: 'border-right'
}
const tabs = document.getElementsByClassName(cList.tabWrap);
console.log("tabs", tabs);

const config = [];
(function() {
    for(const tab of tabs){       
        const param = tab.getAttribute('tab_param');
        config.push((!isNaN(param) && param !== undefined && (param == 1 || param == 0)) ? param : 0); 
    }
})();
    
console.log("config", config);

const getParams = (el) => el.clientWidth + parseInt(getComputedStyle(el).getPropertyValue(cList.borderLeft)) + parseInt(getComputedStyle(el).getPropertyValue(cList.borderRight));
// const getParams = (el, param) => parseInt(getComputedStyle(el).getPropertyValue(param));
const getTabPart = (tabPart, classPart, i = 0) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[i].classList.add(classPart); 
};

for (let t = 0; t < tabs.length; t++) {
    let sumWidth = 0, activeTab, activeIndex;
    const events = ['load', 'resize', 'click'], titles = [], contents = [];

    // const titles = tabs[t].getElementsByClassName(cList.tabTitle)[0].children;
    for(const part of tabs[t].children){    
        if (part.classList.contains(cList.tabTitle)) { for(const child of part.children) { titles.push(child) }};     
        part.classList.contains(cList.tabContent) ? contents.push(part) : null;
    }

    // console.log("titles", titles);
    // console.log("contents", contents);    

    activeIndex = titles.findIndex(index => index.hasAttribute('active'));
    activeTab = ((activeIndex > -1) && (activeIndex < titles.length) && (Number.isInteger(activeIndex))) ? activeIndex : 0;

    // console.log("activeIndex", activeIndex);    
    // console.log("activeTab", activeTab);

    getTabPart(titles, cList.activeTitle, activeTab);
    getTabPart(contents, cList.activeContent, activeTab);

    const contentBorderRadius = parseInt(getComputedStyle(contents[activeTab]).getPropertyValue(cList.borderRadiusTR)); 
    // console.log("contentBorderRadius", contentBorderRadius);
    for (let i = 0; i < titles.length; i++) {  
        titles[i].classList.add('kal_titles_tab');
        
        const sum = getParams(titles[i]);

        console.log("xxxxxxxxxx", sum);

        sumWidth += sum;
        
        console.log("sumWidth", sumWidth);

        for(const event of events){
            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {

                    console.clear();                    

                    getTabPart(this.parentElement.children, cList.activeTitle, i);
                    getTabPart(contents, cList.activeContent, i);
                }           
                new Promise((resolve) => {
                    for (const i of $(tabs[t]).children()) { 
                        i.classList.contains(cList.activeContent) ? resolve(i) : null;
                    };   
                }).then((contentActive) => {
                    // console.log("==========", contentActive);   
                    // console.log("config[t]", config[t]);
                    // const contentWidth = contentActive.clientWidth + getParams(contentActive, cList.borderLeft) + getParams(contentActive, cList.borderRight);

                    const contentWidth = getParams(contentActive);           

                    sumWidth = (config[t] == 1) ? contentWidth : sumWidth;

                    console.log("sumWidth222222222", sumWidth);

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



