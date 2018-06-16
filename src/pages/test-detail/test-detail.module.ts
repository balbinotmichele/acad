import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestDetailPage } from './test-detail';

@NgModule({
  declarations: [
    TestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TestDetailPage),
  ],
})
export class TestDetailPageModule {}
