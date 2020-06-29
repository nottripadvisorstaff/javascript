"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlockInstruction_1 = __importDefault(require("../../../core/blocks/BlockInstruction"));
/**
 * Sidebar input instruction
 */
var SidebarBase = /** @class */ (function (_super) {
    __extends(SidebarBase, _super);
    function SidebarBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renders the value of a sidebar input.
     *
     * @param props The render props.
     *
     * @returns The value of the sidebar input.
     */
    SidebarBase.prototype.save = function (props) {
        return this.value(props);
    };
    /**
     * Renders the value of a sidebar input.
     *
     * @param props The render props.
     *
     * @returns The value of the sidebar input.
     */
    SidebarBase.prototype.edit = function (props) {
        return this.value(props);
    };
    /**
     * Returns whether or not this instruction should be included in the tree.
     *
     * @returns Whether or not to render this instruction.
     */
    SidebarBase.prototype.renderable = function () {
        return this.options.output !== false;
    };
    return SidebarBase;
}(BlockInstruction_1.default));
exports.default = SidebarBase;