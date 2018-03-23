import { Component, OnInit } from '@angular/core'
import { Novel } from '../utilities/Interfaces'
import { ActivatedRoute } from '@angular/router'

@Component(
{
    templateUrl: './novels.component.html'
})
export class NovelsComponent implements OnInit
{
    novels: Novel[]

    constructor(private route: ActivatedRoute) {}

    async ngOnInit()
    {
        this.novels = this.route.snapshot.data['novels']
    }
}
