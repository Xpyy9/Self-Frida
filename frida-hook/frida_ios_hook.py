#!/usr/bin/env python3

# -*- coding: utf-8 -*-

import frida
import threading
import codecs
import sys
import getopt

global session
finished = threading.Event()
APP_JS = "appjs.js"
APP_JS_UI = "app_js_ui.js"
APP_JS_UI_SETHIDDEN = "app_js_ui_sethidden.js"
APP_JS_UI_TARGET = "app_js_ui_target_func.js"
APP_JS_UI_CONTROLLER = "app_js_ui_controller_func.js"
APP_IOS_HOOK = "app_ios_hook.js"
# APP_IOS_HOOK = "log-file-access.js"


def colorPrint(color, s):
    return "%s[31;%dm%s%s[0m" % (chr(27), color, s, chr(27))


# 进程的模块列表
def listModulesOfProcess(session):
    print(dir(session))
    modules = session.enumerate_modules()
    print("===============以下是模块信息===============")
    print(modules)


# 从JS接收的信息
def on_message(message, data):
    try:
        print(message)
        if message:
            payload = message["payload"]['ui']
            print("message:", message)
            if isinstance(payload, dict):
                if payload('ui'):
                    print(colorPrint(31, payload['ui']))
                    UIMESSAGE = UIMESSAGE+payload['ui']
                    print(payload)
    except Exception as e:
        print(e)

# 加载JS文件


def loadJsFile(session, filename, data):
    source = ""
    with codecs.open(filename, "r", "utf-8") as f:
        source = source + f.read()
    source = source + data
    # print(source)
    script = session.create_script(source)
    # print(script)
    script.on('message', on_message)
    script.load()
    if "hook" in filename:
        sys.stdin.read()
    return script

# 进程信息


def listRuningProcess(devices):
    # devices = get_usb_iphone()
    processes = devices.enumerate_processes()
    processes.sort(key=lambda item: item.pid)
    print("================以下是进程信息===============\n")
    print("pid\tname")
    for process in processes:
        print(str(process.pid) + "\t"+process.name)

# 获取设备信息


def get_usb_iphone():
    dManager = frida.get_device_manager()
    changed = threading.Event()

    def on_changed():
        changed.set()
    dManager.on("changed", on_changed)

    device = None
    # print(dir(dManager))
    # print(dManager.enumerate_devices())
    while device is None:
        devices = [dev for dev in dManager.enumerate_devices()
                   if dev.type == "usb"]
        # print(devices)
        if len(devices) == 0:
            print("Waiting for usb device")
            # changed.wait()
        else:
            device = devices[0]
    dManager.off("changed", on_changed)
    return device


def help():
    print("""frida_ios_ui.py appName
    \t-p\t显示进程
    \t-u\t显示UI内容
    \t-i\t参数为内存地址0x0000\t功能；隐藏ui
    \t-t\t参数为内存地址0x0000\t功能：寻找目标函数
    \t-j\t参数（无参数） \t功能：hook动态函数\n
    """)


def main():
    try:
        appname = sys.argv[1]
        opts, args = getopt.getopt(sys.argv[2:], "hput:c:i:j'", [
            "target=", "controller="])
        print(opts)
    except getopt.GetoptError:
        help()
        sys.exit()
    except Exception as e:
        help()
        sys.exit()

    # 1、获取设备信息
    device = get_usb_iphone()
    # print(dir(device))
    print("================以下是设备信息=================")
    print("设备信息："+str(device))
    # 3、安装应用程序信息
    try:
        session = device.attach(appname)
    except Exception as e:
        print(e)
        print("在手机先打开APP，并确认APP名字填写正确...\n")
        help()
        sys.exit()
    for opt, arg in opts:
        if opt == "-h":
            help()
        elif opt in ("-p", "--processes"):
            # 2、获取进程列表
            listRuningProcess(device)
        elif opt in ("-u", "--ui"):
            # 5、显示界面UI
            data = ''
            script = loadJsFile(session, APP_JS_UI, data)
            session.detach()
        elif opt in ("-i", "--hiddenui"):
            # 测试隐藏UI
            data = '("'+arg+'");'
            script = loadJsFile(session, APP_JS_UI_SETHIDDEN, data)
            session.detach()
        elif opt in ("-t", "--target"):
            # 获取UI对应的目标函数
            data = '("'+arg+'");'
            script = loadJsFile(session, APP_JS_UI_TARGET, data)
            session.detach()
        elif opt in ("-c", "--controller"):
            # 获取controller函数
            data = '("'+arg+'");'
            script = loadJsFile(session, APP_JS_UI_CONTROLLER, data)
            session.detach()
        elif opt in ("-j", "--hook"):
            print("hook")
            # hook类方法
            data = '("'+arg+'");'
            script = loadJsFile(session, APP_IOS_HOOK, data)
            session.detach()
        else:
            print("===========")
        # input()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        if session:
            session.detach()
        sys.exit()
