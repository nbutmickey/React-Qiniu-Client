package main

import (
	"crypto/md5"
	"fmt"
	"strings"
	"time"

	"qiniupkg.com/api.v7/conf"
	"qiniupkg.com/api.v7/kodo"
)

//格式划以前的数据

func main() {
	conf.ACCESS_KEY = "XXX"
	conf.SECRET_KEY = "YYY"
	// new一个Bucket对象
	c := kodo.New(0, nil)
	p := c.Bucket("kutear")
	// 调用List方法，第二个参数是前缀,第三个参数是delimiter,第四个参数是marker，第五个参数是列举条数
	// 可以参考 https://github.com/qiniu/api.v7/blob/f956f458351353a3a75a3a519fed4e3069f14df0/kodo/bucket.go#L131
	ListItem, _, _, _ := p.List(nil, "", "", "", 1000)

	// 循环遍历每个操作的返回结果
	for _, item := range ListItem {
		fmt.Println(item.Key, item.Fsize)
		inputTime := item.PutTime / 10000000
		tm := time.Unix(inputTime, 0)
		arr := strings.Split(item.Key, ".")
		exp := strings.ToLower(arr[len(arr)-1])
		fileName := tm.Format("2006/01/02/") + Md5one(item.Key) + "." + exp
		fmt.Println(fileName)
		p.Move(nil, item.Key, fileName)
	}

}

func Md5one(str string) (md5str string) {
	data := []byte(str)
	has := md5.Sum(data)
	md5str = fmt.Sprintf("%x", has)
	return
}
