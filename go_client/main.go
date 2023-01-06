package main

import (
	"context"
	"flag"
	"fmt"

	"github.com/go-redis/redis/v8"
)

type Data struct {
	key   string
	value string
}

func main() {
	setMute := flag.Bool("set", false, "set mute")
	unsetMute := flag.Bool("unset", false, "unset mute")
	flag.Parse()

	c := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	d := Data{
		key:   "mute",
		value: "true",
	}

	var ctx = context.Background()

	if *setMute {
		if err := c.Set(ctx, d.key, "true", 0).Err(); err != nil {
			panic(err)
		}
	}

	if *unsetMute {
		if err := c.Set(ctx, d.key, "false", 0).Err(); err != nil {
			panic(err)
		}
	}

	val, err := c.Get(ctx, d.key).Result()
	switch {
	case err == redis.Nil:
		panic("key does not exist")
	case err != nil:
		panic(err)
	case val == "":
		panic("value is empty")
	}

	fmt.Println(val)
}
