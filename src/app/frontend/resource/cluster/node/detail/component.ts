// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, OnInit} from '@angular/core';
import {NodeDetail} from '@api/backendapi';

import {NodeService} from '../../../../common/services/resource/node';

@Component({
  selector: 'kd-node-detail',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class NodeDetailComponent implements OnInit {
  node: NodeDetail;
  isInitialized = false;

  constructor(private readonly node_: NodeService) {}

  ngOnInit(): void {
    this.node_.getResource('kube-master').subscribe((d: NodeDetail) => {
      this.node = d;
      this.isInitialized = true;
    });
  }
}