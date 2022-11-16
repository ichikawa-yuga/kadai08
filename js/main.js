new Vue({
  el: "#app",
  data: {
    sortType: "",
    productlists: [],
    // ページ遷移のブロック
    pageBox: [],
    pageRange: 5,    // ページネーションに表示するページ数の上限
    // グローバル変数データ3つ
    current_step: "",
    index_start: "",
    index_end: "",

    total_counter: "",
    count: 6,
    currentPage: 0,   // 現在のページ番号

    // ボタン
    btnPrev: false,
    btnNext: false,
  },
  // 2種類のJSON読み込み、DOMの構築が完了したタイミングでページネーション発火
  created() {
    // this.productJson();
    this.pageJson();
    this.domHandler();
    // window.addEventListener('DOMContentLoaded', this.DOMContentLoaded);
  },

  //// // イベント処理
  methods: {
    //  // ページ数を算出()
    split_page: async function (current_step_update) {
      const res = await fetch("js/product.json");
      const users = await res.json();

      this.productlists = users;
      console.log(this.productlists.length)
      console.log(this.productlists.length);
      console.log(this.productlists);

      let total_step = Math.ceil(this.productlists.length / this.count);
      if (current_step_update === undefined || this.current_step === 1) {
        this.current_step = 1;
       // disableクラスを削除
        this.btnNext = false;
        // disableクラスを追加
        this.btnPrev = true;
      } else if (current_step_update === total_step) {
        // disableクラスを追加
        this.btnNext = true;
        // disableクラスを削除
        this.btnPrev = false;
      } else {
        this.current_step = current_step_update;
        // disableクラスを削除
        this.btnNext = false;
        this.btnPrev = false;
      }
      //ページカウンタ
      this.total_counter = this.current_step + "/" + total_step;
      this.redraw(this.current_step, this.count);
    },
  /**
     * 1ページ前に移動する
     */
    prev_btn: function () {
      this.split_page((this.current_step -= 1));
      if (0 < this.currentPage) {
        this.currentPage--;
      }
    },
    /**
     * 1ページ次に移動する
     */
    next_btn: function () {
      this.split_page((this.current_step += 1));
      if (this.currentPage < this.pages - 1) {
        this.currentPage++;
      }
    },
    /**
     * 指定したページに移動する
     * @param {number} index ページ番号
     */
    pageSelect:function (index) {
      this.currentPage = index - 1;
      // ページ番号とtotal_counterの紐づけ
      this.split_page((this.current_step = index));
    },
    /**
     * ページを変更したときの処理
     */
    pageJson: async function () {
      const res2 = await fetch("js/page.json");
      const users2 = await res2.json();
      this.pageBox = users2;
    },

    // DOMContentLoaded: function () {
    //   this.split_page();
    // },
    // 商品6個表示ページネーション処理
    // productlists2: function () {
    //   let head = this.currentPage * this.count;
    //   return this.productlists.slice(head, head + this.count);
    // },
    sortList: function () {
      let newList = [];
       // 商品6個表示ページネーション処理
      // let sliceList = this.productlists2();
      // console.log(newList);
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
      console.log(newList);
       // 商品6個表示ページネーション処理
      let head = this.currentPage * this.count;
      let sliceList = newList.slice(head, head + this.count);
      console.log(sliceList);
      return sliceList;
    },
    // increment: function(){
    //   setTimeout(function() {this.count += 1})

    // DOMの構築が完了したタイミングでページネーション発火(createdを使うはず、研修テキスト10を参考に)
    domHandler: function ($event) {
      window.addEventListener("DOMContentLoaded", () => {
        this.split_page();

        this.pageBox.forEach((element, index) => {
          element.addEventListener("click", function (e) {
            this.current_step = Number(this.pageBox.pageNumber);
            this.split_page(this.current_step);
          });
        });
      });
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
    },
  },
  computed: {
    // productlists2: function () {
    //   let head = this.currentPage * this.count;
    //     return this.productlists.slice(head, head + this.count);
    // },
    pages () {
      return Math.ceil(this.productlists.length / this.count);
    },
    displayPageRange: function () {
      // return Math.ceil(this.productlists.length / this.count);
      let half = Math.ceil(this.pageRange / 2);
      let start, end;

      if (this.pages < this.pageRange) {
        // ページネーションのrangeよりページ数がすくない場合
        start = 1;
        end = this.pages;
      
      } else if (this.currentPage < half) {
        // 左端のページ番号が1になったとき
        start = 1;
        end = start + this.pageRange - 1;

      } else if (this.pages - half < this.currentPage) {
        // 右端のページ番号が総ページ数になったとき
        end = this.pages;
        start = end - this.pageRange + 1;

      } else {
        // activeページを中央にする
        start = this.currentPage - half + 1;
        end = this.currentPage + half;
      }
    
      let indexes = [];
      for (let i = start; i <= end; i++) {
        indexes.push(i);
      }
      return indexes;
    },
  },
});
