const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'kal_tabs',
    activeTitle: 'kal_tab_active',
    tabContent: 'kal_contents',
    activeContent: 'kal_content_active',
    borderRadius: 'kal_borderradius',
    borderRadiusTR: 'border-top-right-radius',
    borderRadiusTL: 'border-top-left-radius',
    borderRadiusBR: 'border-bottom-right-radius',
    borderRadiusBL: 'border-bottom-left-radius',
    borderLeft: 'border-left',
    borderRight: 'border-right'
},
tabs = document.getElementsByClassName(cList.tabWrap),
getParams = (el) => el.clientWidth + parseInt(getComputedStyle(el).getPropertyValue(cList.borderLeft)) + parseInt(getComputedStyle(el).getPropertyValue(cList.borderRight)),
getTabPart = (tabPart, classPart, i = 0) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[i].classList.add(classPart); 
};

// console.log("tabs", tabs);  

for (const tab of tabs) {
    let sumWidth = 0, activeTab, tabActiveIndex, borderRadiusSide, borderRadiusOtherSide;
    const titles = [], contents = [], 
          events = ['load', 'resize', 'click'], 
          alignTabs = tab.getAttribute('align_tabs'), 
          positionTabs = tab.getAttribute('position'),
          positionArr = ["top", "top", "bottom", "bottom", "left", "left", "right", "right"], 
          sideArr = ["start", "end", "start", "end", "start", "end", "start", "end"],
          setArrSide = ['TL', 'TR', 'BL ', 'BR', 'TL', 'BL', 'TR', 'BR'], 
          setArrOtherSide = ['TR', 'TL', 'BR ', 'BL', 'BL', 'TL', 'BR', 'TR'],
          configTabsFlex = (alignTabs === "start" || alignTabs === "end") ? 0 : 1, 
          configTabsAlign = (alignTabs === "start" || alignTabs === "end" || alignTabs === "justify" || alignTabs === "center") ? alignTabs : "start",
          configTabsPosition = (positionTabs === "top" || positionTabs === "bottom" || positionTabs === "left" || positionTabs === "right") ? positionTabs : 'top'; 

    console.log("tab", tab);
    // console.log("alignTabs", alignTabs);
    // console.log("configTabsAlign", configTabsAlign);
    // console.log("configTabsPosition", positionTabs);
    // console.log("configTabsPosition", configTabsPosition);

    for (let i = 0; i < positionArr.length; i++) { 
        if ((configTabsPosition === positionArr[i]) && (configTabsAlign === sideArr[i])) { 
            borderRadiusSide = cList[`borderRadius${setArrSide[i]}`] 
        }
    };
    for (let i = 0; i < positionArr.length; i++) { 
        if ((configTabsPosition === positionArr[i]) && (configTabsAlign === sideArr[i])) { 
            borderRadiusOtherSide = cList[`borderRadius${setArrOtherSide[i]}`] 
        };
    };

    if (alignTabs === "justify" || alignTabs === "center") {
        if (configTabsPosition === 'top') {
            borderRadiusSide = 'border-top-right-radius';
            borderRadiusOtherSide = 'border-top-left-radius';
        } else if (configTabsPosition === 'bottom') {
            borderRadiusSide = 'border-bottom-right-radius';
            borderRadiusOtherSide = 'border-bottom-left-radius';
        };
    };
    
    if ((configTabsPosition === "top") || (configTabsPosition === "bottom") || (configTabsPosition === "left") || (configTabsPosition === "right")){
        tab.classList.add(`kal_${configTabsPosition}`);
    };


    for(const part of tab.children){    
        if (part.classList.contains(cList.tabTitle)) { 
            for(const child of part.children) { titles.push(child) };
            part.classList.add(`kal_flex_${configTabsAlign}`);
            if (configTabsPosition === "left" || configTabsPosition === "right") {
                const maxSideSize = tab.getAttribute('max_side_size'),
                      maxSideSizeConfig = ((Number.isInteger(+maxSideSize)) && (+maxSideSize < getParams(tab)) && (+maxSideSize > 0)) ? maxSideSize : 200;
                part.style.maxWidth = `${maxSideSizeConfig}px`;                
                part.style.flexWrap = `wrap`;    
                
                // for(const child of part.children) { child.style.width = '100%' };
                // console.log("getParams(contentActive)", getParams(tab));
                // console.log("maxSideSize", maxSideSize);
                // console.log("maxSideSizeConfig", maxSideSizeConfig);
            }

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

    // console.log("borderRadiusSide", borderRadiusSide);
    // console.log("borderRadiusOtherSide", borderRadiusOtherSide);

    const contentBorderRadius = parseInt(getComputedStyle(contents[activeTab]).getPropertyValue(borderRadiusSide)); 

    console.log("contentBorderRadius", contentBorderRadius);

    for (let i = 0; i < titles.length; i++) {  
        titles[i].classList.add('kal_tab');
        contents[i].classList.add('kal_content');

        console.log("configTabsAlign", configTabsAlign);
        console.log("configTabsPosition", configTabsPosition);


        if ((configTabsAlign === 'justify') && ((configTabsPosition === "top") || (configTabsPosition === "bottom"))) {
            titles[i].style.cssText = `justify-content: center; text-align: center; width: ${100/titles.length}%`;
        }

        // titles[i].style.cssText = ((configTabsAlign === 'justify') && ((configTabsPosition === "top") || (configTabsPosition === "bottom"))) 
        //     ? `justify-content: center; text-align: center; width: ${100/titles.length}%` : null;
        
        titles[i].style.cssText = (((configTabsAlign === 'justify') || (configTabsAlign === 'center')) && ((configTabsPosition === "left") || (configTabsPosition === "right"))) 
            ? `width: 100%` : null;

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
                    sumWidth = (configTabsFlex == 1) ? contentWidth : sumWidth;

                    // console.log("contentWidth", contentWidth);
                    // console.log("sumWidth222222222", sumWidth);

                    // titles[i].classList.remove(cList.borderRadius);
                    // titles[i].offsetTop === 0 ? titles[i].classList.add(cList.borderRadius) : null;

                    const btl = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-top-left-radius')); 
                    const btr = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-top-right-radius')); 
                    const bbl = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-bottom-left-radius')); 
                    const bbr = parseInt(getComputedStyle(titles[i]).getPropertyValue('border-bottom-right-radius')); 

                    // console.log("btl", btl);
                    // console.log("btr", btr);
                    // console.log("bbl", bbl);
                    // console.log("bbr", bbr);
                    // console.log("titles[i]", titles);

                    // let offset = titles[i].offset();
                    // let top = offset.top;
                    // console.log("top", top);

                    // let bottom = top + titles[i].outerHeight();
                    // console.log("bottom", bottom);


                    (positionTabs === "top" && titles[i].offsetTop === 0) ? titles[i].style.borderRadius = `${btl}px ${btr}px 0px 0px` 
                        : (positionTabs === "bottom" && titles[i].offsetTop === 0) ? titles[i].style.borderRadius = `${btl}px ${btr}px 0px 0px` 
                        : null;

                    titles[i].style.flexGrow = (configTabsFlex == 1) ? configTabsFlex 
                        : ((configTabsFlex == 0) && (sumWidth >= contentWidth)) ? 1 : 0;



                    contentActive.style[borderRadiusSide] = '0px'; 
                    contentActive.style[borderRadiusOtherSide] = (sumWidth >= contentWidth) ? '0px' 
                        : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                        : `${contentBorderRadius}px`;
                });
            });
        };
    };
};



