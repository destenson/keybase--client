// Copyright 2015 Keybase, Inc. All rights reserved. Use of
// this source code is governed by the included BSD license.

package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"text/template"

	"github.com/blang/semver"
)

// WriteVersion will generate version.go file
func WriteVersion(version string, build uint64, pkg string, path string) error {
	if pkg == "" {
		return fmt.Errorf("No package name for version file")
	}

	vars := map[string]string{
		"Package": pkg,
		"Version": version,
		"Build":   fmt.Sprintf("%d", build),
	}

	t := template.New("version")
	t, err := t.Parse(`// This file is autogenerated, see tools/release/version.go

package {{.Package}}

// Version is the current version (should be MAJOR.MINOR.PATCH)
const Version = "{{.Version}}"

// DefaultBuild is the default build number
const DefaultBuild = "{{.Build}}"

`)
	if err != nil {
		return err
	}

	if path != "" {
		var data bytes.Buffer
		err = t.Execute(&data, vars)
		if err != nil {
			return err
		}
		return ioutil.WriteFile(path, data.Bytes(), 0644)
	}
	return nil
}

// SplitVersion splits version 1.2.3-400 => "1.2.3", 400
func SplitVersion(versionRaw string) (version string, build uint64, err error) {
	sversion, err := semver.Make(versionRaw)
	if err != nil {
		return
	}

	version = fmt.Sprintf("%d.%d.%d", sversion.Major, sversion.Minor, sversion.Patch)
	if len(sversion.Pre) == 0 {
		err = fmt.Errorf("No pre-release build number")
		return
	}
	pre := sversion.Pre[0]
	if !pre.IsNum {
		log.Fatal("Pre-release is not a number")
	}
	build = sversion.Pre[0].VersionNum
	return
}
