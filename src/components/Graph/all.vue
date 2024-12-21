<template>
  <div id="container2"></div>
</template>

<script>
  import { Graph } from '@antv/x6';

  export default {
    name: 'FlowChart',
    props: {
      data: Array,
    },
    data() {
      return {
        width: 1000,
        height: 800,
        graph: '',
        tasks: [],
        colors: {
          ljy: '#A0522D', //炼焦油
          cb: '#D2691E', //粗苯
          xjm: '#9370DB', //洗精煤
          wym: '#8A2BE2', //无烟煤
          jf: '#FBC44A', //焦粉
          zq: '#87CEFA', //蒸汽
          yq: '#87CEEB', //氧气
          kq: '#B0C4DE', //空气
          dq: '#6495ED', //氮气
          shsfwg: '#3974FC', //石灰石粉外购
          shstsj: '#E8CC7A', //石灰石脱S剂
          lmsf: '#54CCD6', //菱镁石粉
          tpf: '#F99860', //碳排放
          ym: '#800080', //烟煤
          jt: '#A52A2A', //焦炭
          dlwg: '#BADF5B', //电力外购
          cog: '#990000', //cog
          bfg: '#FF3333', //bfg
          ldg: '#CD5C73', //ldg
          gmhj: '#083671', //硅锰合金
          fg: '#7f7f80', //废钢
          gt: '#AB6F0F', //硅铁
          bys: '#7f7f80', //白云石
        },
      };
    },
    watch: {
      data: {
        handler() {
          this.$nextTick(() => this.data && this.data.length === 62 && this.init());
        },
        immediate: true,
      },
    },
    methods: {
      change() {
        this.width = this.width - 30;
        this.height = this.height - 30;
        this.graph.centerContent();
      },
      initRects(graph) {
        const jh = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 40,
          x: 180,
          y: 160,
          label: '焦化',
        });
        const cog = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 300,
          y: 120,
          label: 'COG',
        });
        const sj = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 200,
          y: 255,
          label: '烧结',
        });
        const qt = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 220,
          y: 350,
          label: '球团',
        });
        const lt = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 60,
          x: 400,
          y: 240,
          label: '炼铁',
        });
        const bfg = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 480,
          y: 320,
          label: 'BFG',
        });
        const lg = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 60,
          x: 600,
          y: 240,
          label: '炼钢',
        });
        const ldg = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 700,
          y: 320,
          label: 'LDG',
        });
        const zg = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 60,
          x: 800,
          y: 240,
          label: '轧钢',
        });
        const dl = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 900,
          y: 200,
          label: '电力',
        });
        const zbdc = graph.addNode({
          shape: 'rect',
          width: 60,
          height: 30,
          x: 700,
          y: 200,
          label: '自备电厂',
        });
        return { jh, cog, sj, qt, lt, bfg, lg, ldg, zg, dl, zbdc };
      },
      initLine1(graph, start, end, text, strokeWidth = 18) {
        graph.addEdge({
          source: start,
          target: end,
          // 如果没有 args 参数，可以简写为 router: 'orth'
          connector: { name: 'smooth' },
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            line: {
              fill: 'none',
              stroke: '#7f7f80',
              strokeWidth,
              connection: true,
              targetMarker: '',
            },
            label: {
              textPath: { selector: 'line', startOffset: '50%' },
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              text: text,
              fontSize: '12',
              fill: '#000000',
            },
          },
        });
      },
      initLine2({
        graph,
        start,
        anchor = 'bottom',
        end,
        offset,
        vertices,
        color,
        strokeWidth = 3,
      }) {
        const edge = {
          source: start,
          target: end,
          router: 'orth',
          connector: 'rounded',
          vertices: vertices,
          zIndex: 1,
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
          ],
          attrs: {
            line: {
              targetMarker: '',
              fill: 'none',
              strokeWidth: strokeWidth,
              stroke: color,
              connection: true,
            },
          },
        };
        if (offset) {
          edge.source = {
            cell: start,
            anchor: {
              name: anchor,
              args: {
                dx: offset.dx || 0,
                dy: offset.dy || 0,
              },
            },
          };
        }
        graph.addEdge(edge);
      },
      initText({ graph, x, y, text }) {
        // const zg = graph.addNode({
        graph.addNode({
          shape: 'rect',
          x,
          y,
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              fill: 'none',
              strokeWidth: 0,
            },
            label: {
              textAnchor: 'end',
              textVerticalAnchor: 'middle',
              text: text,
              fontSize: '13',
              fill: 'rgba(153, 153, 153, 1)',
              zIndex: 100,
            },
          },
        });
      },
      initText1({ graph, x, y, text }) {
        // const zg = graph.addNode({
        graph.addNode({
          shape: 'rect',
          x,
          y,
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              fill: 'none',
              strokeWidth: 0,
            },
            label: {
              textAnchor: 'end',
              textVerticalAnchor: 'middle',
              text: text,
              fontSize: '32',
              fill: '#333',
              zIndex: 100,
            },
          },
        });
      },
      initText2({ graph, x, y, text }) {
        // const zg = graph.addNode({
        graph.addNode({
          shape: 'rect',
          x,
          y,
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              fill: 'none',
              strokeWidth: 0,
            },
            label: {
              textAnchor: 'start',
              textVerticalAnchor: 'middle',
              text: text,
              fontSize: '13',
              fill: 'rgba(153, 153, 153, 1)',
              zIndex: 100,
            },
          },
        });
      },
      initLine3({ graph, start, end, color, strokeWidth = 1, offset = {} }) {
        graph.addEdge({
          source: {
            cell: start,
            anchor: {
              name: 'left',
              args: {
                dx: offset.dx || 10,
                dy: offset.dy || 0,
              },
            },
          },
          target: end,
          connector: { name: 'smooth' },
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
          ],
          attrs: {
            line: {
              fill: 'none',
              stroke: color,
              strokeWidth: strokeWidth,
              connection: true,
              targetMarker: '',
            },
          },
        });
      },
      initLine4({ graph, start, anchor = 'right', end, offset, vertices, color, strokeWidth = 3 }) {
        const edge = {
          source: start,
          target: end,
          router: 'orth',
          connector: 'rounded',
          vertices: vertices,
          zIndex: 1,
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
          ],
          attrs: {
            line: {
              targetMarker: '',
              fill: 'none',
              strokeWidth: strokeWidth,
              stroke: color,
              connection: true,
            },
          },
        };
        if (offset) {
          edge.source = {
            cell: start,
            anchor: {
              name: anchor,
              args: {
                dx: offset.dx || 0,
                dy: offset.dy || 0,
              },
            },
          };
        }
        graph.addEdge(edge);
      },
      initLine5({ graph, start, anchor = 'left', end, offset, vertices, color, strokeWidth = 3 }) {
        const edge = {
          source: start,
          target: end,
          router: 'orth',
          connector: 'rounded',
          vertices: vertices,
          zIndex: 1,
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
          ],
          attrs: {
            line: {
              targetMarker: '',
              fill: 'none',
              strokeWidth: strokeWidth,
              stroke: color,
              connection: true,
            },
          },
        };
        if (offset) {
          edge.source = {
            cell: start,
            anchor: {
              name: anchor,
              args: {
                dx: offset.dx || 0,
                dy: offset.dy || 0,
              },
            },
          };
        }
        graph.addEdge(edge);
      },
      initLine6(graph, start, end, text, strokeWidth = 18) {
        graph.addEdge({
          source: start,
          target: end,
          // 如果没有 args 参数，可以简写为 router: 'orth'
          connector: { name: 'smooth' },
          markup: [
            {
              tagName: 'path',
              selector: 'line',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            line: {
              fill: 'none',
              stroke: '#5B9688',
              strokeWidth,
              connection: true,
              targetMarker: '',
            },
            label: {
              textPath: { selector: 'line', startOffset: '50%' },
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              text: text,
              fontSize: '12',
              fill: '#000000',
            },
          },
        });
      },
      init() {
        this.graph && this.graph.dispose();
        this.tasks.splice(0);
        const graph = (this.graph = new Graph({
          container: document.getElementById('container2'),
          width: 580,
          height: 500,
          interacting: {
            nodeMovable: false,
            edgeMovable: false,
          },
          background: {
            color: 'rgba(0,0,0,0)',
          },
        }));
        const colors = this.colors;
        graph.translate(-120, 0); // 在 x、y 方向上平移画布
        graph.zoom(-0.4); //缩放
        const rects = this.initRects(graph);
        const nextTick = this.$nextTick();
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            start: rects.jh,
            end: { x: 40, y: 160 },
            color: colors.xjm,
            strokeWidth: 22,
          });
          this.initText2({ graph, x: 40, y: 140, text: `(1) 洗精煤：${val} t` });
          this.initText1({ graph, x: 550, y: -100, text: `碳足迹` });
        }); //1
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.jh,
            end: rects.cog,
            strokeWidth: 1,
            vertices: [
              { x: 145, y: 150 },
              { x: 145, y: 85 },
            ],
            color: colors.cog,
            anchor: 'left',
            offset: { dy: 10 },
          }); //x: 180, y: 160,
          nextTick.then(() => this.initText2({ graph, x: 200, y: 100, text: `(2) COG:${val} t` }));
        }); //2
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.jh,
            end: rects.bfg,
            strokeWidth: 7,
            vertices: [
              { x: 140, y: 195 },
              { x: 140, y: 450 },
            ],
            color: colors.bfg,
            anchor: 'left',
            offset: { dy: 5 },
          }); //x: 180, y: 160,
          nextTick.then(() => this.initText2({ graph, x: 150, y: 440, text: `(3) BFG:${val} t` }));
        }); //3
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1,
            start: rects.jh,
            end: rects.dl,
            vertices: [
              { x: 140, y: 165 },
              { x: 140, y: 50 },
            ],
            color: colors.dlwg,
          }); //x: 200,  y: 200,
          nextTick.then(() => this.initText({ graph, x: 650, y: 42, text: `(4) 电力：${val} t` }));
        }); //4
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            strokeWidth: 1,
            start: rects.jh,
            end: { x: 40, y: 100 },
            color: colors.dq,
          });
          this.initText2({ graph, x: 40, y: 100, text: `(5) 氮气：${val} t` });
        }); //5
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            strokeWidth: 1,
            start: rects.jh,
            end: { x: 40, y: 40 },
            color: colors.zq,
          });
          this.initText2({ graph, x: 40, y: 50, text: `(6) 蒸汽：${val} t` });
        }); //6
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.jh,
            end: rects.cog,
            anchor: 'right',
            offset: { dy: 10 },
            vertices: [{ x: 330, y: 185 }],
            color: colors.cog,
            strokeWidth: 5,
          });
          nextTick.then(() => this.initText2({ graph, x: 300, y: 200, text: `(7) COG:${val} t` }));
        }); //7
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.jh,
            end: { x: 270, y: 30 },
            color: colors.zq,
            offset: { dy: -10 },
            strokeWidth: 1,
          });
          this.initText({ graph, x: 270, y: 30, text: `(8) 蒸汽：${val} t` });
        }); //8
        this.tasks.push((val) => {
          this.initLine6(graph, rects.jh, rects.lt, `(9) 焦炭：${val} t`, 18);
        }); //9
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.jh,
            end: { x: 280, y: 15 },
            color: colors.ljy,
            offset: { dy: -5 },
            strokeWidth: 1.5,
          });
          this.initText({ graph, x: 280, y: 15, text: `(10) 炼焦油：${val} t` });
        }); //10
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.jh,
            end: { x: 290, y: 0 },
            color: colors.cb,
            offset: { dy: 0 },
            strokeWidth: 1,
          });
          this.initText({ graph, x: 290, y: 0, text: `(11) 粗苯：${val} t` });
        }); //11
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.jh,
            end: { x: 300, y: -35 },
            color: colors.tpf,
            offset: { dy: 5 },
            strokeWidth: 6,
          });
          this.initText({ graph, x: 420, y: -40, text: `(12) 焦化工序碳排放：${val} t` });
        }); //12
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.sj,
            end: rects.cog,
            strokeWidth: 1,
            vertices: [
              { x: 135, y: 250 },
              { x: 135, y: 65 },
            ],
            color: colors.cog,
            anchor: 'left',
            offset: { dy: 10 },
          }); //x: 180, y: 160,
          nextTick.then(() => this.initText2({ graph, x: 200, y: 75, text: `(13) COG:${val} t` }));
        }); //13
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            start: rects.sj,
            end: { x: 40, y: 200 },
            color: colors.zq,
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 40, y: 200, text: `(14) 蒸汽：${val} t` });
        }); //14
        this.tasks.push((val) => {
          this.initLine6(graph, rects.jh, rects.sj, ``, 6);
          this.initText2({ graph, x: 170, y: 230, text: `(15)焦炭：${val} t` });
        }); //15
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            start: rects.sj,
            end: { x: 40, y: 240 },
            color: colors.wym,
            strokeWidth: 2.5,
          });
          this.initText2({ graph, x: 40, y: 250, text: `(16) 无烟煤：${val} t` });
        }); //16
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1,
            start: rects.sj,
            end: rects.dl,
            vertices: [
              { x: 150, y: 240 },
              { x: 150, y: 90 },
            ],
            color: colors.dlwg,
          }); //x: 200,  y: 200,
          nextTick.then(() => this.initText({ graph, x: 650, y: 82, text: `(17) 电力：${val} t` }));
        }); //17
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            start: rects.sj,
            end: { x: 40, y: 280 },
            color: colors.dq,
            strokeWidth: 0.5,
          });
          this.initText2({ graph, x: 40, y: 290, text: `(18) 氮气：${val} t` });
        }); //18
        this.tasks.push((val) => {
          this.initLine1(graph, rects.sj, rects.lt, `(19) 烧结矿：${val} t `, 11);
        }); //19
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.sj,
            end: { x: 320, y: 520 },
            color: colors.tpf,
            offset: { dy: 13 },
            strokeWidth: 4.5,
          });
          this.initText({ graph, x: 320, y: 520, text: `(20) 烧结工序碳排放：${val} t` });
        }); //20
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.qt,
            end: rects.cog,
            strokeWidth: 1,
            vertices: [
              { x: 115, y: 350 },
              { x: 115, y: 45 },
            ],
            color: colors.cog,
            anchor: 'left',
            offset: { dy: 10 },
          }); //x: 180, y: 160,
          nextTick.then(() => this.initText2({ graph, x: 200, y: 55, text: `(21) COG:${val} t` }));
        }); //21
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1,
            start: rects.qt,
            end: rects.dl,
            vertices: [
              { x: 160, y: 340 },
              { x: 160, y: 70 },
            ],
            color: colors.dlwg,
          }); //x: 200, y: 310,
          nextTick.then(() => this.initText({ graph, x: 650, y: 62, text: `(22) 电力：${val} t` }));
        }); //22
        this.tasks.push((val) => {
          this.initLine1(graph, rects.qt, rects.lt, `(23) 球团矿：${val} t`, 11);
        }); //23
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.qt,
            end: { x: 308, y: 500 },
            color: colors.tpf,
            offset: { dy: 0 },
            strokeWidth: 2,
          });
          this.initText({ graph, x: 308, y: 500, text: `(24) 球团工序碳排放：${val} t` });
        }); //24
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 330, y: 510 },
            color: colors.wym,
            offset: { dy: 10 },
            strokeWidth: 3.5,
          });
          this.initText2({ graph, x: 330, y: 510, text: `(25) 无烟煤：${val} t` });
        }); //25
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 337, y: 490 },
            color: colors.ym,
            offset: { dy: 13 },
            strokeWidth: 3,
          });
          this.initText2({ graph, x: 337, y: 490, text: `(26)烟煤：${val} t` });
        }); //26
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.cog,
            end: { x: 420, y: 240 },
            anchor: 'right',
            offset: { dy: 10 },
            color: colors.cog,
            strokeWidth: 1,
          });
          nextTick.then(() => this.initText({ graph, x: 460, y: 165, text: `(27) COG:${val} t` }));
        }); //27
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 7,
            start: rects.lt,
            end: rects.bfg,
            anchor: 'left',
            offset: { dy: 18 },
            vertices: [
              { x: 375, y: 305 },
              { x: 375, y: 350 },
            ],
            color: colors.bfg,
          }); // x: 400,y: 250,
          nextTick.then(() => this.initText({ graph, x: 500, y: 360, text: `(28) BFG:${val} t` }));
        }); //28
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.lt,
            end: rects.dl,
            offset: { dy: -37 },
            vertices: [
              { x: 430, y: 205 },
              { x: 430, y: 110 },
            ],
            color: colors.dlwg,
            strokeWidth: 1,
          }); // x: 400,y: 250,
          nextTick.then(() =>
            this.initText({ graph, x: 650, y: 102, text: `(29) 电力：${val} t` })
          );
        }); //29
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 346, y: 470 },
            color: colors.zq,
            offset: { dy: 16 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 346, y: 470, text: `(30) 蒸汽：${val} t` });
        }); //30
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 354, y: 440 },
            color: colors.yq,
            offset: { dy: 19 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 354, y: 440, text: `(31) 氧气：${val} t` });
        }); //31
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 362, y: 420 },
            color: colors.kq,
            offset: { dy: 22 },
            strokeWidth: 2.5,
          });
          this.initText2({ graph, x: 362, y: 420, text: `(32) 高炉鼓风：${val} t` });
        }); //32
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lt,
            end: { x: 370, y: 400 },
            color: colors.dq,
            offset: { dy: 25 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 370, y: 400, text: `(33) 氮气：${val} t` });
        }); //33
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.lt,
            end: rects.bfg,
            anchor: 'right',
            offset: { dy: 10 },
            vertices: [{ x: 510, y: 280 }],
            color: colors.bfg,
            strokeWidth: 23,
          }); // x: 400,y: 250,
          nextTick.then(() => this.initText({ graph, x: 500, y: 310, text: `(34) BFG:${val} t` }));
        }); //34
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.zbdc,
            end: rects.lt,
            anchor: 'left',
            offset: { dy: -10 },
            vertices: [{ x: 470, y: 205 }],
            color: colors.dlwg,
            strokeWidth: 1,
          });
          nextTick.then(() => this.initText({ graph, x: 590, y: 200, text: `(35) 电力:${val} t` }));
        }); //35
        this.tasks.push((val) => {
          this.initLine1(graph, rects.lt, rects.lg, `(36) 铁水：${val} t`);
        }); //36
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.lt,
            end: { x: 500, y: -20 },
            color: colors.tpf,
            offset: { dy: -10 },
            strokeWidth: 9,
          });
          this.initText({ graph, x: 580, y: -25, text: `(37) 炼铁工序碳排放：${val} t` });
        }); //37
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.cog,
            end: rects.lg,
            anchor: 'right',
            offset: { dy: 5 },
            vertices: [{ x: 630, y: 145 }],
            color: colors.cog,
            strokeWidth: 1,
          });
          nextTick.then(() => this.initText({ graph, x: 580, y: 150, text: `(38) COG:${val} t` }));
        }); //38
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.lg,
            strokeWidth: 1,
            end: rects.ldg,
            anchor: 'left',
            offset: { dy: 10 },
            vertices: [
              { x: 542, y: 280 },
              { x: 542, y: 340 },
            ],
            color: colors.ldg,
          }); // x: 400,y: 250,
          nextTick.then(() => this.initText({ graph, x: 700, y: 360, text: `(39) LDG:${val} t` }));
        }); //39
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.bfg,
            end: rects.lg,
            offset: { dx: 20 },
            vertices: [
              { x: 570, y: 380 },
              { x: 570, y: 380 },
            ],
            color: colors.bfg,
            strokeWidth: 1,
          }); // x: 500,  y: 320,
          nextTick.then(() => this.initText({ graph, x: 680, y: 325, text: `(40) BFG:${val} t` }));
        }); //40
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lg,
            end: { x: 549, y: 510 },
            color: colors.bys,
            offset: { dy: 10 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 549, y: 510, text: `(41) 白云石：${val} t` });
        }); //41
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lg,
            end: { x: 556, y: 490 },
            color: colors.fg,
            offset: { dy: 14 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 556, y: 490, text: `(42) 废钢：${val} t` });
        }); //42
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1,
            start: rects.lg,
            end: rects.dl,
            anchor: 'left',
            offset: { dy: -10 },
            vertices: [
              { x: 570, y: 235 },
              { x: 570, y: 130 },
            ],
            color: colors.dlwg,
          }); //  x: 600, y: 255,
          nextTick.then(() =>
            this.initText({ graph, x: 650, y: 122, text: `(43) 电力：${val} t` })
          );
        }); //43
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lg,
            end: { x: 563, y: 470 },
            color: colors.zq,
            offset: { dy: 18 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 563, y: 470, text: `(44) 蒸汽：${val} t` });
        }); //44
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lg,
            end: { x: 570, y: 450 },
            color: colors.yq,
            offset: { dy: 22 },
            strokeWidth: 2,
          });
          this.initText2({ graph, x: 570, y: 450, text: `(45) 氧气：${val} t` });
        }); //45
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.lg,
            end: { x: 578, y: 430 },
            color: colors.dq,
            offset: { dy: 26 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 578, y: 430, text: `(46) 氮气：${val} t` });
        }); //46
        this.tasks.push((val) => {
          this.initLine1(graph, rects.lg, rects.zg, `(47) 钢水：${val} t`);
        }); //47
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.lg,
            end: rects.ldg,
            anchor: 'right',
            offset: { dy: 10 },
            vertices: [
              { x: 710, y: 280 },
              { x: 710, y: 280 },
            ],
            color: colors.ldg,
            strokeWidth: 4,
          }); // x: 400,y: 250,
          nextTick.then(() => this.initText({ graph, x: 770, y: 310, text: `(48) LDG:${val} t` }));
        }); //48
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.lg,
            end: { x: 690, y: -5 },
            color: colors.tpf,
            offset: { dy: -10 },
            strokeWidth: 2.5,
          });
          this.initText({ graph, x: 780, y: -10, text: `(49) 炼钢工序碳排放：${val} t` });
        }); //49
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.cog,
            end: rects.zg,
            anchor: 'right',
            offset: { dy: -10 },
            vertices: [{ x: 830, y: 145 }],
            color: colors.cog,
            strokeWidth: 2.4,
          });
          nextTick.then(() => this.initText({ graph, x: 830, y: 120, text: `(50) COG:${val} t` }));
        }); //50
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.bfg,
            end: rects.zg,
            offset: { dx: 10 },
            vertices: [
              { x: 570, y: 400 },
              { x: 570, y: 400 },
            ],
            color: colors.bfg,
            strokeWidth: 1.5,
          }); // x: 500,  y: 320,
          nextTick.then(() => this.initText({ graph, x: 700, y: 390, text: `(51) BFG:${val} t` }));
        }); //51
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.ldg,
            end: rects.zg,
            anchor: 'right',
            offset: { dy: 0 },
            vertices: [
              { x: 800, y: 335 },
              { x: 800, y: 335 },
            ],
            color: colors.ldg,
            strokeWidth: 4.3,
          }); // x: 400,y: 250,
          nextTick.then(() => this.initText2({ graph, x: 770, y: 350, text: `(52) LDG:${val} t` }));
        }); //52
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1.5,
            start: rects.zg,
            end: rects.dl,
            anchor: 'left',
            offset: { dy: -10 },
            vertices: [
              { x: 770, y: 240 },
              { x: 770, y: 170 },
            ],
            color: colors.dlwg,
          }); // x: 800, y: 255,
          nextTick.then(() =>
            this.initText({ graph, x: 890, y: 162, text: `(53) 电力：${val} t` })
          );
        }); //53
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.zg,
            end: { x: 765, y: 510 },
            color: colors.zq,
            offset: { dy: 15 },
            strokeWidth: 1,
          });
          this.initText2({ graph, x: 765, y: 510, text: `(54) 蒸汽：${val} t` });
        }); //54
        this.tasks.push((val) => {
          this.initLine1(graph, rects.zg, { x: 980, y: 270 }, `(55) 钢材：${val} t`);
        }); //55
        this.tasks.push((val) => {
          this.initLine4({
            graph,
            start: rects.zg,
            end: { x: 890, y: 10 },
            color: colors.tpf,
            offset: { dy: -10 },
            strokeWidth: 4,
          });
          this.initText({ graph, x: 960, y: 5, text: `(56) 轧钢工序碳排放：${val} t` });
        }); //56
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.cog,
            end: rects.zbdc,
            anchor: 'right',
            offset: { dy: 0 },
            vertices: [{ x: 730, y: 145 }],
            color: colors.cog,
            strokeWidth: 3,
          });
          nextTick.then(() => this.initText({ graph, x: 720, y: 150, text: `(57) COG:${val} t` }));
        }); //57
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            start: rects.zbdc,
            end: rects.bfg,
            offset: { dy: -5 },
            vertices: [{ x: 510, y: 230 }],
            color: colors.bfg,
            strokeWidth: 5.8,
          }); // x: 500,  y: 320,
          nextTick.then(() => this.initText({ graph, x: 640, y: 217, text: `(58) BFG:${val} t` }));
        }); //58
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 1.6,
            start: rects.zbdc,
            end: rects.dl,
            anchor: 'left',
            offset: { dy: 0 },
            vertices: [
              { x: 670, y: 200 },
              { x: 670, y: 150 },
            ],
            color: colors.dlwg,
          }); // x: 800, y: 255,
          nextTick.then(() =>
            this.initText({ graph, x: 890, y: 142, text: `(59) 电力：${val} t` })
          );
        }); //59
        this.tasks.push((val) => {
          this.initLine5({
            graph,
            start: rects.zbdc,
            end: { x: 660, y: 30 },
            color: colors.zq,
            offset: { dy: 5 },
            strokeWidth: 2.0,
          });
          this.initText({ graph, x: 660, y: 20, text: `(60) 蒸汽：${val} t` });
        }); //60
        this.tasks.push((val) => {
          this.initLine3({
            graph,
            start: rects.zbdc,
            end: { x: 900, y: 215 },
            color: colors.dlwg,
            offset: { dx: 0 },
            strokeWidth: 2.8,
          });
          this.initText2({ graph, x: 760, y: 205, text: `(61) 电力：${val} t` });
        }); //61
        this.tasks.push((val) => {
          this.initLine2({
            graph,
            strokeWidth: 6,
            start: rects.dl,
            end: { x: 1030, y: 254 },
            vertices: [{ x: 1000, y: 254 }],
            color: colors.dlwg,
          });
          this.initText({ graph, x: 1000, y: 244, text: `(62) 外购电力：${val} t` });
        }); //62

        for (let i = 0; i < this.tasks.length; i++) {
          if (this.data[i]) {
            this.tasks[i](this.data[i]);
          }
        }
      },
    },
  };
</script>

<style scoped></style>
