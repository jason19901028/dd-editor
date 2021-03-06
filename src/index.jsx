/*
 * @Author: Aiden
 * @Date: 2020-07-16 15:53:29
 * @LastEditTime: 2021-04-18 22:13:00
 * @LastEditors: Aiden
 * @Description: This is the entrance, including the header toolbar and the node part.（这是入口，包含头部工具条和节点部分。）
 */

import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import './index.css'
import Node from "./components";
import Header from "./components/Header";
import data from "./data.json";
import { useDataShare, Observer, useUpdated } from "./components/shared";
function TreeNode(props) {
  const { NodeContainer, treeData, editorEnable, updateDataFn } = props;
  const [dataTree, setDataTree] = useState(treeData);
  const canvasRef = useRef(null);
  useEffect(() => {
    useDataShare.excute({ command: "init", param: treeData });
    // 订阅tree的数据结构是否发生变化，如果发生了变化就及时更新整个树。
    Observer.subscribe("tree", e => {
      setDataTree(e.args.msg);
    });
  }, []);
  updateDataFn(dataTree)
  return (
    <div ref={canvasRef}>
      <Header ref={canvasRef}></Header>
      <Node
        dataTree={dataTree}
        NodeContainer={NodeContainer}
        editorEnable={editorEnable}
      ></Node>
    </div>
  );
}
TreeNode.propTypes = {
  treeData: PropTypes.array.isRequired,
  editorEnable: PropTypes.bool.isRequired,
  NodeContainer: PropTypes.elementType,
  updateDataFn: PropTypes.func,
};

TreeNode.defaultProps = {
  treeData: data,
  editorEnable: true,
  NodeContainer: <React.Fragment></React.Fragment>,
};

TreeNode.displayName = 'DDEditor';

export default TreeNode;
export {
  TreeNode as DDEditor,
  useUpdated
}
// module.exports = TreeNode;
