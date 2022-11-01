new Vue({
  el: "#app",
  data: {
    sortType: "",
    productlists: [],
    // ページ遷移のブロック
    pageBox: [],
    // グローバル変数データ3つ
    current_step: "",
    index_start: "",
    index_end: "",

    total_counter: "",
    count: "6",
  },
  // 2種類のJSON読み込み、DOMの構築が完了したタイミングでページネーション発火
  created() {
    this.productJson()
    this.pageJson()
    window.addEventListener('DOMContentLoaded', this.DOMContentLoaded);
  },
  //     // // イベント処理
  methods: {
    //  // ページ数を算出()
    split_page: function (current_step_update) {
      let total_step = Math.ceil(this.productlists.length / this.count);
      // if (current_step_update === undefined || this.current_step === 1) {
      //   this.current_step = 1;
      //   this.next_btn().classList.remove('disable');
      //   this.prev_btn().classList.add('disable');
      // } else if (current_step_update === total_step) {
      //   this.next_btn().classList.add('disable');
      //   this.prev_btn().classList.remove('disable');
      // } else {
      //   this.current_step = current_step_update;
      //   this.next_btn().classList.remove('disable');
      //   this.prev_btn().classList.remove('disable');
      // }
      this.total_counter = this.current_step + '/' + total_step;
      this.redraw(this.current_step, this.count);
    },
    prev_btn: function () {
      this.split_page(this.current_step += 1);
    },
    next_btn: function () {
      this.split_page(this.current_step -= 1);
      // this.total_counter = "next"
    },
    productJson: async function () {
      const res = await fetch("js/product.json");
      const users = await res.json();
      this.productlists = users;
    },
    pageJson: async function () {
      const res2 = await fetch("js/page.json");
      const users2 = await res2.json();
      this.pageBox = users2;
    },

    DOMContentLoaded: function () {
      this.split_page();
    },

    // increment: function(){
    //   setTimeout(function() {this.count += 1})

    // DOMの構築が完了したタイミングでページネーション発火(createdを使うはず、研修テキスト10を参考に)
    //    window.addEventListener('DOMContentLoaded', () => {
    //    this.split_page();
    //    this.pageBox.forEach((element, index) => {
    //         element.addEventListener('click', function(e) {
    //             this.current_step = Number(this.pageBox.pageNumber);
    //             this.split_page(this.current_step);
    //         })
    //     });
    // })
    sortList: function () {
      let newList = [];
      for (let i = 0; i < this.productlists.length; i++) {
        let isShow = true;
        if (this.sortType === 1 && this.productlists[i].label !== 1) {
          isShow = false;
          // 表示しない
        }
        if (this.sortType === 2 && this.productlists[i].label !== 2) {
          isShow = false;
          // 表示しない
        }
        if (this.sortType === 3 && this.productlists[i].label !== 3) {
          isShow = false;
          // 表示しない
        }
        if (isShow) {
          newList.push(this.productlists[i]);
        }
      }
      return newList;
    },


    // DOMの描画
    redraw: function (current_step, count) {
      // 現在の表示indexを割り出す
      this.index_start = current_step * count - count;
      this.index_end = current_step * count - 1;
      let index_array = [];
      for (let i = this.index_start; i < this.index_end + 1; i++) {
        index_array.push(i);
      }

      // vueでどう書き換えるかわからない
      // // 一時削除
      // while( syohin_item.lastChild ) {
      //   syohin_item.lastChild.remove();
      // }

      // // 再描画
      // redraw_elements.forEach((element, index) => {
      //     if(index_array.indexOf(index) != -1) {
      //       syohin_item.appendChild(element);
      //     }
      // });
    },


  },
});