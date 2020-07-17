const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'kal_tabs',
    activeTitle: 'kal_tab_active',
    tabContent: 'kal_contents',
    activeContent: 'kal_content_active',
    borderRadius: 'kal_borderradius',
    borderRadiusTR: 'border-top-right-radius',
    borderRadiusTL: 'border-top-left-radius',
    borderLeft: 'border-left',
    borderRight: 'border-right'
};
const tabs = document.getElementsByClassName(cList.tabWrap);
const getParams = (el) => el.clientWidth + parseInt(getComputedStyle(el).getPropertyValue(cList.borderLeft)) + parseInt(getComputedStyle(el).getPropertyValue(cList.borderRight));
const getTabPart = (tabPart, classPart, i = 0) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[i].classList.add(classPart); 
};

// console.log("tabs", tabs);  

for (const tab of tabs) {
    let sumWidth = 0, activeTab, tabActiveIndex;
    const events = ['load', 'resize', 'click'], titles = [], contents = [], alignTabs = tab.getAttribute('align_tabs'), positionTabs = tab.getAttribute('position');
    // const alignTabs = tab.getAttribute('align_tabs');
    // const positionTabs = tab.getAttribute('position');
    const configTabsAlign = (alignTabs === "start" || alignTabs === "end") ? 0 : 1; 
    const configTabsPosition = (positionTabs === "top" || positionTabs === "bottom" || positionTabs === "left" || positionTabs === "right") ? positionTabs : 'top'; 

    // console.log("alignTabs", alignTabs);
    // console.log("configTabsAlign", configTabsAlign);
    console.log("configTabsPosition", positionTabs);
    console.log("configTabsPosition", configTabsPosition);

    for(const part of tab.children){    
        if (part.classList.contains(cList.tabTitle)) { 
            for(const child of part.children) { titles.push(child) }
            part.classList.add(`kal_flex_${alignTabs}`);
        };     
        if (part.classList.contains(cList.tabContent)) { 
            // console.log("contents", part.children);
            for(const child of part.children) { contents.push(child) }
        };     
    }



    // console.log("titles", titles);
    // console.log("contents", contents);    

    tabActiveIndex = titles.findIndex(index => index.hasAttribute('active'));
    activeTab = ((tabActiveIndex > -1) && (tabActiveIndex < titles.length) && (Number.isInteger(tabActiveIndex))) ? tabActiveIndex : 0;

    // console.log("tabActiveIndex", tabActiveIndex);    
    // console.log("activeTab", activeTab);

    getTabPart(titles, cList.activeTitle, activeTab);
    getTabPart(contents, cList.activeContent, activeTab);

    const borderRadiusSide = (alignTabs === "end") ? cList.borderRadiusTL : cList.borderRadiusTR;
    const contentBorderRadius = parseInt(getComputedStyle(contents[activeTab]).getPropertyValue(borderRadiusSide)); 

    console.log("borderRadiusSide", borderRadiusSide);
    console.log("contentBorderRadius", contentBorderRadius);

    for (let i = 0; i < titles.length; i++) {  
        titles[i].classList.add('kal_tab');
        contents[i].classList.add('kal_content');


        titles[i].style.cssText = (alignTabs === 'justify') ? `justify-content: center; text-align: center; width: ${100/titles.length}%` : null;

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
                new Promise((resolve) => {
                    for (const i of contents) { 
                        i.classList.contains(cList.activeContent) ? resolve(i) : null;
                    };   
                }).then((contentActive) => {
                    // console.log("contentActive", contentActive);   

                    const contentWidth = getParams(contentActive);
                    sumWidth = (configTabsAlign == 1) ? contentWidth : sumWidth;

                    // console.log("contentWidth", contentWidth);
                    // console.log("sumWidth222222222", sumWidth);

                    // titles[i].classList.remove(cList.borderRadius);
                    // titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;

                    const btl = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-top-left-radius')); 
                    const btr = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-top-right-radius')); 
                    const bbl = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-bottom-left-radius')); 
                    const bbr = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-bottom-right-radius')); 

                    console.log("btl", btl);
                    console.log("btr", btr);
                    console.log("bbl", bbl);
                    console.log("bbr", bbr);
                    console.log("titles[i]", titles);

                    let offset = titles[i].offset();
                    let top = offset.top;
                    console.log("top", top);

                    let bottom = top + titles[i].outerHeight();
                    console.log("bottom", bottom);


                    (positionTabs === "top" && titles[i].offsetTop === 0) ? titles[i].style.borderRadius = `${btl}px ${btr}px 0px 0px` 
                        : (positionTabs === "bottom" && titles[i].offsetTop === 0) ? titles[i].style.borderRadius = `${btl}px ${btr}px 0px 0px` 
                        : null;

                    titles[i].style.flexGrow = (configTabsAlign == 1) ? configTabsAlign 
                        : ((configTabsAlign == 0) && (sumWidth >= contentWidth)) ? 1 : 0;

                    contentActive.style[`${(alignTabs === "end") ? cList.borderRadiusTR : cList.borderRadiusTL}`] = '0px';     
                    contentActive.style[borderRadiusSide] = (sumWidth >= contentWidth) ? '0px' 
                        : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                        : `${contentBorderRadius}px`;
                });
            });
        };
    };
};



