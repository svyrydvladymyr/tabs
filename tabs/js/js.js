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
};
const tabs = document.getElementsByClassName(cList.tabWrap), config = [];
const getParams = (el) => el.clientWidth + parseInt(getComputedStyle(el).getPropertyValue(cList.borderLeft)) + parseInt(getComputedStyle(el).getPropertyValue(cList.borderRight));
const getTabPart = (tabPart, classPart, i = 0) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[i].classList.add(classPart); 
};

// console.log("tabs", tabs);  

for (const tab of tabs) {
    let sumWidth = 0, activeTab, tabActiveIndex;
    const events = ['load', 'resize', 'click'], titles = [], contents = [];
    const tabParam = tab.getAttribute('tab_param');
    const configTabsAlign = (tabParam === "left" || tabParam === "right") ? 0 : (tabParam === "center") ? 1 : 1; 

    console.log("par", tabParam);
    // console.log("conf", configTabsAlign);

    for(const part of tab.children){    
        if (part.classList.contains(cList.tabTitle)) { 
            for(const child of part.children) { titles.push(child) }
            part.classList.add(`kal_flex_${tabParam}`);
        };     
        part.classList.contains(cList.tabContent) ? contents.push(part) : null;
    }

    // console.log("titles", titles);
    // console.log("contents", contents);    

    tabActiveIndex = titles.findIndex(index => index.hasAttribute('active'));
    activeTab = ((tabActiveIndex > -1) && (tabActiveIndex < titles.length) && (Number.isInteger(tabActiveIndex))) ? tabActiveIndex : 0;

    // console.log("tabActiveIndex", tabActiveIndex);    
    // console.log("activeTab", activeTab);

    getTabPart(titles, cList.activeTitle, activeTab);
    getTabPart(contents, cList.activeContent, activeTab);

    const borderRadiusSide = (tabParam === "right") ? cList.borderRadiusTL : cList.borderRadiusTR;

    // console.log("borderRadiusSide", borderRadiusSide);

    const contentBorderRadius = parseInt(getComputedStyle(contents[activeTab]).getPropertyValue(borderRadiusSide)); 
    // console.log("contentBorderRadius", contentBorderRadius);
    for (let i = 0; i < titles.length; i++) {  
        titles[i].classList.add('kal_titles_tab');
        
        const sum = getParams(titles[i]);
        sumWidth += sum;

        // console.log("xxxxxxxxxx", sum);
        // console.log("sumWidth", sumWidth);

        for(const event of events){
            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {

                    console.clear();                    

                    getTabPart(this.parentElement.children, cList.activeTitle, i);
                    getTabPart(contents, cList.activeContent, i);
                }       

                console.log("titlessssssssssss", titles);
                console.log("titlesuuuuuuuuuuu", $(tab).children());



                new Promise((resolve) => {
                    for (const i of $(tab).children()) { 
                        i.classList.contains(cList.activeContent) ? resolve(i) : null;
                    };   
                }).then((contentActive) => {
                    // console.log("contentActive", contentActive);   

                    const contentWidth = getParams(contentActive);
                    sumWidth = (configTabsAlign == 1) ? contentWidth : sumWidth;

                    // console.log("sumWidth222222222", sumWidth);

                    titles[i].classList.remove(cList.borderRadius);
                    titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;

                    titles[i].style.flexGrow = (configTabsAlign == 1) ? configTabsAlign 
                        : ((configTabsAlign == 0) && (sumWidth >= contentWidth)) ? 1 : 0;

                    contentActive.style[`${(tabParam === "right") ? cList.borderRadiusTR : cList.borderRadiusTL}`] = '0px';     
                    contentActive.style[borderRadiusSide] = (sumWidth >= contentWidth) ? '0px' 
                        : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                        : `${contentBorderRadius}px`;
                });
            });
        };
    };
};



