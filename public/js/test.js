let testWords = [];

const getTestWords = () => {
    testWords = [
      {id:1, word:'tree', mean:'나무', result: true},
      {id:2, word:'bird', mean:'새', result: true},
      {id:3, word:'orange', mean:'오렌지', result: true},
      {id:4, word:'melon', mean:'멜론', result: true},
      {id:5, word:'dog', mean:'개', result: true},
      {id:6, word:'cat', mean:'고양이', result: true},
      {id:7, word:'orange', mean:'오렌지', result: true},
      {id:8, word:'melon', mean:'멜론', result: true},
      {id:9, word:'dog', mean:'개', result: true},
      {id:10, word:'cat', mean:'고양이', result: true}
    ];
    const shuffle = array => {
        for (let i = 0; i < array.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
      };
      shuffle(testWords);
};