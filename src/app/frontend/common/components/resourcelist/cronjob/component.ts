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

import {HttpParams} from '@angular/common/http';
import {Component} from '@angular/core';
import {CronJob, CronJobList} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {Observable} from 'rxjs/Observable';
import {ResourceListWithStatuses} from '../../../resources/list';
import {EndpointManager} from '../../../services/resource/endpoint';
import {NamespacedResourceService} from '../../../services/resource/resource';
import {ListGroupIdentifiers, ListIdentifiers} from '../groupids';

@Component({
  selector: 'kd-cron-job-list',
  templateUrl: './template.html',
})
export class CronJobListComponent extends ResourceListWithStatuses<CronJobList, CronJob> {
  constructor(
      state: StateService, private readonly cronJob_: NamespacedResourceService<CronJobList>) {
    super('pod', state);
    this.id = ListIdentifiers.cronJob;
    this.groupId = ListGroupIdentifiers.workloads;
  }

  getResourceObservable(params?: HttpParams): Observable<CronJobList> {
    return this.cronJob_.get(EndpointManager.cronJob.list(), undefined, params);
  }

  map(cronJobList: CronJobList): CronJob[] {
    return cronJobList.items;
  }

  isInErrorState(resource: CronJob): boolean {
    return resource.suspend;
  }

  isInWarningState(): boolean {
    return false;
  }

  isInSuccessState(resource: CronJob): boolean {
    return !this.isInErrorState(resource) && !this.isInWarningState();
  }

  getDisplayColumns(): string[] {
    return ['statusicon', 'name', 'labels', 'schedule', 'suspend', 'active', 'lastschedule', 'age'];
  }
}