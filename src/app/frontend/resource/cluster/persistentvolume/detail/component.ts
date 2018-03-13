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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersistentVolumeDetail} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {Subscription} from 'rxjs/Subscription';

import {EndpointManager, Resource} from '../../../../common/services/resource/endpoint';
import {ResourceService} from '../../../../common/services/resource/resource';

@Component({
  selector: 'kd-persistent-volume-detail',
  templateUrl: './template.html',
})
export class PersistentVolumeDetailComponent implements OnInit, OnDestroy {
  private persistentVolumeSubscription_: Subscription;
  private persistentVolumeName_: string;
  persistentVolume: PersistentVolumeDetail;
  isInitialized = false;

  constructor(
      private readonly persistentVolume_: ResourceService<PersistentVolumeDetail>,
      private readonly state_: StateService) {}

  ngOnInit(): void {
    this.persistentVolumeName_ = this.state_.params.resourceName;
    this.persistentVolumeSubscription_ =
        this.persistentVolume_
            .get(
                EndpointManager.resource(Resource.persistentVolume).detail(),
                this.persistentVolumeName_)
            .subscribe((d: PersistentVolumeDetail) => {
              this.persistentVolume = d;
              this.isInitialized = true;
            });
  }

  ngOnDestroy(): void {
    this.persistentVolumeSubscription_.unsubscribe();
  }
}