import { Component } from '@angular/core';
import { ResolveEnd, Route, Router, Routes } from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    tabsLink: Routes = [];
    parentUrl: string;

    constructor(private router: Router) {
        router.events.subscribe((route) => {
            if (route instanceof ResolveEnd) {
                let firstChild = route.state.root;

                while (firstChild.firstChild) {
                    firstChild = firstChild.firstChild;
                }

                const routeConfig = route.state.root.children[0].routeConfig;

                const path = `/${routeConfig.path}/`;
                if (path !== this.parentUrl) {
                    this.tabsLink = [];
                }
                this.parentUrl = path;

                if (routeConfig.children) {
                    routeConfig.children.forEach((children: Route) => {
                        if (children.path && children.data.display && !this.tabsLink.includes(children)) {
                            this.tabsLink.push(children);
                        }
                    });
                } else {
                    this.tabsLink = [];
                }
            }
        });
    }

    displayingTabs(): boolean {
        return 0 < this.tabsLink.length;
    }
}
