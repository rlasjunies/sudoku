// import * as ashuffle from "./arrayShuffle";

it('empty test',()=>{
    expect(true).toBeTruthy();
})

// const arraySize = 9;
// const testReplay = 1000;
// it('test perf', () => {

//     const testArray = [];
//     for (var i = 0; i < arraySize; i++) {
//         testArray[i] = i;
//     }

//     console.time('knuthfisheryates');
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.knuthfisheryates(testArray);
//     }
//     console.timeEnd('knuthfisheryates');
//     console.markTimeline
    
//     console.time('knuthfisheryates2');
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.knuthfisheryates2(testArray);
//     }
//     console.timeEnd('knuthfisheryates2');



//     console.time('knuthfisheryatesES6');
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.knuthfisheryatesES6(testArray);
//     }
//     console.timeEnd('knuthfisheryatesES6');

//     console.time('knuthfisheryates2b');
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.knuthfisheryates2b(testArray);
//     }
//     console.timeEnd('knuthfisheryates2b');

//     console.time('mezclar2')
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.mezclar2(testArray);
//     }
//     console.timeEnd('mezclar2');

//     console.time('mezclar3')
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.mezclar3(testArray);
//     }
//     console.timeEnd('mezclar2');

//     console.time('NaiveShuffle')
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.NaiveShuffle(testArray);
//     }
//     console.timeEnd('NaiveShuffle');

//     console.time('shuffle1')
//     for (let index = 0; index < testReplay; index++) {        
//         ashuffle.shuffle1(testArray);
//     }
//     console.timeEnd('shuffle1');

//     // TO LONG
//     // console.time('shuffle2')
//     // for (let index = 0; index < testReplay; index++) {        
//     //     ashuffle.shuffle2(testArray);
//     // }
//     // console.timeEnd('shuffle2');


// })