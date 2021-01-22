import { Module } from 'clean-state'

declare function install(modules: Record<string, Module>, on: any): any

export default typeof install